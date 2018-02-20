import { find, findIndex, omit, reject } from "lodash";
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

import {
    emptyProject, getTasksFromProject, IProject, IProjects, isDoneTask, setTasksToProject,
} from "../domain/project";
import { createTask, ITask } from "../domain/task";
import * as message from "./message";

const actionCreator = actionCreatorFactory("TASKS");

const addOrModifyProject = actionCreator<{ name: string, project: IProject }>("MODIFY_PROJECT");
const removeProject = actionCreator<string>("REMOVE_PROJECT");
const setCurrentProjectName = actionCreator<string>("SET_CURRENT_PROJECT");
const setCurrentTaskId = actionCreator<string>("SET_CURRENT_TASK_ID");

function modifyProject(project: IProject) {
    return (dispatch, getState) => {
        const { currentProjectName }: IState = getState().tasks;

        dispatch(addOrModifyProject({ name: currentProjectName, project }));
    };
}

function getProject(getState: () => { tasks: IState }): IProject {
    const { currentProjectName, projects } = getState().tasks;

    return projects[currentProjectName];
}

export const actionCreators = {
    addProject: (name: string) => (dispatch) => {
        dispatch(addOrModifyProject({ name, project: emptyProject }));
        dispatch(setCurrentProjectName(name));
    },
    addTask: (task: ITask) => (dispatch, getState) => {
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

        tasks[findIndex(tasks, { id: task.id })] = task;

        dispatch(modifyProject(setTasksToProject(project, tasks, done)));
    },
    removeProject: (name: string) => (dispatch, getState) => {
        if (Object.keys(getState().tasks.projects).length === 1) {
            dispatch(message.actionCreators.sendMessage(
                "You cannot delete the last project.", { error: true }));
            return;
        }

        dispatch(removeProject(name));
    },
    removeTask: (id: string) => (dispatch, getState) => {
        const project = getProject(getState);
        const done = isDoneTask(project, id);

        dispatch(modifyProject(setTasksToProject(
            project,
            reject(getTasksFromProject(project, done), { id }),
            done)));
    },
    renameProject: actionCreator<string>("RENAME_PROJECT"),
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
            find(sourceTasks, { id }),
            ...getTasksFromProject(project, !done),
        ];
        sourceTasks = reject(sourceTasks, { id });

        dispatch(modifyProject({
            doneTasks: done ? sourceTasks : destinationTasks,
            todoTasks: done ? destinationTasks : sourceTasks,
        }));
    },
};

interface IState {
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
    .case(actionCreators.renameProject,
        ({ currentProjectName, projects, ...rest }, name) => ({
            currentProjectName: name,
            projects: {
                ...omit(projects, currentProjectName),
                [name]: projects[currentProjectName],
            },
            ...rest,
        }))
    .case(addOrModifyProject,
        ({ projects, ...rest }, { name, project }) => ({
            projects: { ...projects, [name]: project },
            ...rest,
        }))
    .case(removeProject,
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
        (state, currentTaskId) => ({ ...state, currentTaskId }));

export const persistent = true;
