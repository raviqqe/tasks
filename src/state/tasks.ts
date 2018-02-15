import { find, findIndex, omit, reject } from "lodash";
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

import { getTasksFromProject, IProject, IProjects, isDoneTask, setTasksToProject } from "../domain/project";
import { createTask, ITask } from "../domain/task";

const actionCreator = actionCreatorFactory("TASKS");

export const actionCreators = {
    addProject: actionCreator<string>("ADD_PROJECT"),
    addTask: actionCreator<ITask>("ADD_TASK"),
    changeProjectName: actionCreator<string>("CHANGE_PROJECT_NAME"),
    modifyTask: actionCreator<ITask>("MODIFY_TASK"),
    removeProject: actionCreator<string>("REMOVE_PROJECT"),
    removeTask: actionCreator<string>("REMOVE_TASK"),
    setCurrentProjectName: actionCreator<string>("SET_CURRENT_PROJECT"),
    setCurrentTaskId: actionCreator<string>("SET_CURRENT_TASK_ID"),
    setTasks: actionCreator<ITask[]>("SET_TASKS"),
    toggleTaskState: actionCreator<string>("TOGGLE_TASK"),
};

interface IState {
    currentProjectName: string | null;
    currentTaskId: string | null;
    projects: IProjects;
}

export const initialState: IState = {
    currentProjectName: null,
    currentTaskId: null,
    projects: {},
};

export const reducer = reducerWithInitialState(initialState)
    .case(actionCreators.addProject,
        ({ projects, ...rest }, name) => ({
            projects: { ...projects, [name]: { doneTasks: [], todoTasks: [] } },
            ...rest,
        }))
    .case(actionCreators.addTask,
        ({ currentProjectName, projects, ...rest }, task) => {
            const project = projects[currentProjectName];

            return {
                currentProjectName,
                projects: {
                    ...projects,
                    [currentProjectName]: {
                        ...project,
                        todoTasks: [task, ...project.todoTasks],
                    },
                },
                ...rest,
            };
        })
    .case(actionCreators.changeProjectName,
        ({ currentProjectName, projects, ...rest }, name) => ({
            currentProjectName,
            projects: {
                ...omit(projects, currentProjectName),
                [name]: projects[currentProjectName],
            },
            ...rest,
        }))
    .case(actionCreators.modifyTask,
        ({ currentProjectName, projects, ...rest }, task) => {
            const project = projects[currentProjectName];
            const done = isDoneTask(project, task.id);
            const tasks = getTasksFromProject(project, done);

            return {
                currentProjectName,
                projects: {
                    ...projects,
                    [currentProjectName]: setTasksToProject(
                        project,
                        Object.assign(tasks, { [findIndex(tasks, { id: task.id })]: task }),
                        done,
                    ),
                },
                ...rest,
            };
        })
    .case(actionCreators.removeProject,
        ({ currentProjectName, projects, ...rest }, name) => {
            const newProjects = omit(projects, name);

            return {
                currentProjectName: name === currentProjectName
                    ? Object.keys(newProjects)[0] || null
                    : currentProjectName,
                projects: newProjects,
                ...rest,
            };
        })
    .case(actionCreators.removeTask,
        ({ currentProjectName, projects, ...rest }, id) => {
            const project = projects[currentProjectName];
            const done = isDoneTask(project, id);
            const tasks = getTasksFromProject(project, done);

            return {
                currentProjectName,
                projects: {
                    ...projects,
                    [currentProjectName]: setTasksToProject(project, reject(tasks, { id }), done),
                },
                ...rest,
            };
        })
    .case(actionCreators.setCurrentProjectName,
        (state, currentProjectName) => ({ ...state, currentProjectName }))
    .case(actionCreators.setCurrentTaskId,
        (state, currentTaskId) => ({ ...state, currentTaskId }))
    .case(actionCreators.setTasks,
        (state, tasks) => {
            if (tasks.length === 0) {
                return state;
            }

            const { currentProjectName, projects } = state;
            const project = projects[currentProjectName];

            return {
                ...state,
                projects: {
                    ...projects,
                    [currentProjectName]: setTasksToProject(
                        project, tasks, isDoneTask(project, tasks[0].id),
                    ),
                },
            };
        })
    .case(actionCreators.toggleTaskState,
        ({ currentProjectName, projects, ...rest }, id) => {
            const project = projects[currentProjectName];
            const done = isDoneTask(project, id);

            let sourceTasks = getTasksFromProject(project, done);
            const destinationTasks = [
                find(sourceTasks, { id }),
                ...getTasksFromProject(project, !done),
            ];
            sourceTasks = reject(sourceTasks, { id });

            return {
                currentProjectName,
                projects: {
                    ...projects,
                    [currentProjectName]: {
                        doneTasks: done ? sourceTasks : destinationTasks,
                        todoTasks: done ? destinationTasks : sourceTasks,
                    },
                },
                ...rest,
            };
        });

export const persistent = true;
