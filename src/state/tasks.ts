import { difference, find, findIndex, isEqual, omit, reject } from "lodash";
import { Store } from "redux";
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

import {
    emptyProject, getTasksFromProject, IProject, IProjects, isDoneTask, setTasksToProject,
} from "../domain/project";
import { createTask, ITask, updateTask } from "../domain/task";
import * as firebase from "../infra/firebase";
import projectsRepository from "../infra/projects-repository";
import * as message from "./message";

const actionCreator = actionCreatorFactory("TASKS");

const originalAddOrModifyProject = actionCreator<{ name: string, project: IProject }>("ADD_OR_MODIFY_PROJECT");
const originalRemoveProject = actionCreator<string>("REMOVE_PROJECT");
const setCurrentProjectName = actionCreator<string>("SET_CURRENT_PROJECT_NAME");
const setCurrentTaskId = actionCreator<string>("SET_CURRENT_TASK_ID");

function addOrModifyProject(name: string, project: IProject) {
    return (dispatch, getState) => {
        dispatch(originalAddOrModifyProject({ name, project }));

        if (getState().authentication.signedIn) {
            projectsRepository.addOrModifyProject(name, project);
        }
    };
}

function removeProject(name: string) {
    return (dispatch, getState) => {
        if (Object.keys(getState().tasks.projects).length === 1) {
            dispatch(message.actionCreators.sendMessage(
                "You cannot delete the last project."));
            return;
        }

        dispatch(originalRemoveProject(name));

        if (getState().authentication.signedIn) {
            projectsRepository.removeProject(name);
        }
    };
}

function modifyProject(project: IProject) {
    return (dispatch, getState) => {
        dispatch(addOrModifyProject(getState().tasks.currentProjectName, project));
    };
}

function getProject(getState: () => { tasks: IState }): IProject {
    const { currentProjectName, projects } = getState().tasks;

    return projects[currentProjectName];
}

export const actionCreators = {
    addProject: (name: string) => (dispatch) => {
        if (!name) {
            dispatch(message.actionCreators.sendMessage("Project names cannot be empty."));
            return;
        }

        dispatch(addOrModifyProject(name, emptyProject));
        dispatch(setCurrentProjectName(name));
    },
    addTask: (task: ITask) => (dispatch, getState) => {
        if (!task.name) {
            dispatch(message.actionCreators.sendMessage("Task names cannot be empty."));
            return;
        }

        const project = getProject(getState);

        dispatch(modifyProject({
            ...project,
            todoTasks: [task, ...project.todoTasks],
        }));
        dispatch(setCurrentTaskId(task.id));
    },
    modifyTask: (task: ITask) => (dispatch, getState) => {
        const project = getProject(getState);
        const done = isDoneTask(project, task.id);
        const tasks = [...getTasksFromProject(project, done)];

        tasks[findIndex(tasks, { id: task.id })] = updateTask(task);

        dispatch(modifyProject(setTasksToProject(project, tasks, done)));
    },
    removeProject,
    removeTask: (id: string) => (dispatch, getState) => {
        const project = getProject(getState);
        const done = isDoneTask(project, id);

        dispatch(modifyProject(setTasksToProject(
            project,
            reject(getTasksFromProject(project, done), { id }),
            done)));
    },
    renameProject: (name: string) => (dispatch, getState) => {
        const { currentProjectName, projects } = getState().tasks;

        if (name === currentProjectName) {
            return;
        }

        dispatch(addOrModifyProject(name, projects[currentProjectName]));
        dispatch(removeProject(currentProjectName));
    },
    setCurrentProjectName,
    setCurrentTaskId,
    setTasks: (tasks: ITask[]) => (dispatch, getState) => {
        if (tasks.length === 0) {
            return;
        }

        const project = getProject(getState);

        dispatch(modifyProject(setTasksToProject(
            project, tasks, isDoneTask(project, tasks[0].id),
        )));
    },
    toggleTaskState: (id: string) => (dispatch, getState) => {
        const project = getProject(getState);
        const done = isDoneTask(project, id);

        let sourceTasks = getTasksFromProject(project, done);
        const destinationTasks = [
            updateTask(find(sourceTasks, { id })),
            ...getTasksFromProject(project, !done),
        ];
        sourceTasks = reject(sourceTasks, { id });

        dispatch(modifyProject({
            doneTasks: done ? sourceTasks : destinationTasks,
            todoTasks: done ? destinationTasks : sourceTasks,
        }));
    },
    updateProjects: actionCreator<IProjects>("UPDATE_PROJECTS"),
};

export type IActionCreators = typeof actionCreators;

export interface IState {
    currentProjectName: string;
    currentTaskId: string | null;
    projects: IProjects;
}

const defaultProjectName = "default";

export const initialState: IState = {
    currentProjectName: defaultProjectName,
    currentTaskId: null,
    projects: { [defaultProjectName]: emptyProject },
};

export const reducer = reducerWithInitialState(initialState)
    .case(originalAddOrModifyProject,
        ({ projects, ...rest }, { name, project }) => ({
            projects: { ...projects, [name]: project },
            ...rest,
        }))
    .case(originalRemoveProject,
        ({ currentProjectName, projects, ...rest }, name) => {
            const newProjects = omit(projects, name);

            return {
                currentProjectName: name === currentProjectName
                    ? Object.keys(newProjects)[0]
                    : currentProjectName,
                projects: newProjects,
                ...rest,
            };
        })
    .case(actionCreators.setCurrentProjectName,
        (state, currentProjectName) => ({ ...state, currentProjectName }))
    .case(actionCreators.setCurrentTaskId,
        (state, currentTaskId) => ({ ...state, currentTaskId }))
    .case(actionCreators.updateProjects, ({ currentProjectName, ...rest }, projects) => ({
        ...rest,
        currentProjectName: projects.hasOwnProperty(currentProjectName)
            ? currentProjectName
            : Object.keys(projects)[0],
        projects,
    }));

export const persistent = true;

export function initializeStore(store: Store<any>): void {
    firebase.onAuthStateChanged(async (user) => {
        // Only `actionCreators.updateProjects()` can be used here to avoid uppdate loop.

        if (user) {
            const getProjects: () => IProjects = () => store.getState().tasks.projects;
            let localProjects = getProjects();
            const remoteProjects = await projectsRepository.getProjects();
            const newProjects = { ...localProjects, ...remoteProjects };

            if (localProjects.hasOwnProperty(defaultProjectName) &&
                isEqual(localProjects[defaultProjectName], emptyProject) &&
                Object.keys(newProjects).length !== 1) {
                localProjects = omit(localProjects, defaultProjectName);
            }

            for (const name of difference(Object.keys(localProjects), Object.keys(remoteProjects))) {
                projectsRepository.addOrModifyProject(name, localProjects[name]);
            }

            store.dispatch(actionCreators.updateProjects(newProjects));

            projectsRepository.subscribeProjects(
                (name: string, project: IProject) =>
                    store.dispatch(actionCreators.updateProjects(
                        { ...getProjects(), [name]: project })),
                (name: string) => store.dispatch(
                    actionCreators.updateProjects(omit(getProjects(), name))));
        } else {
            projectsRepository.unsubscribeProjects();
        }
    });
}
