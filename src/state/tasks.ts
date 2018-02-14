import { find, findIndex, omit, reject } from "lodash";
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

import { booleanToTaskState, IProject } from "../domain/project";
import { createTask, ITask } from "../domain/task";

const actionCreator = actionCreatorFactory("TASKS");

export const actionCreators = {
    addProject: actionCreator<string>("ADD_PROJECT"),
    addTask: actionCreator<ITask>("ADD_TASK"),
    changeProjectName: actionCreator<{ oldName: string, newName: string }>("CHANGE_PROJECT_NAME"),
    modifyTask: actionCreator<ITask>("MODIFY_TASK"),
    setCurrentProject: actionCreator<string>("SET_CURRENT_PROJECT"),
    toggleTaskState: actionCreator<string>("TOGGLE_TASK"),
};

interface IState {
    currentProject: string | null;
    todo: boolean;
    projects: { [name: string]: IProject };
}

export const initialState: IState = {
    currentProject: null,
    projects: {},
    todo: true,
};

export const reducer = reducerWithInitialState(initialState)
    .case(actionCreators.addProject,
        ({ projects, ...rest }, name) => ({
            projects: { ...projects, [name]: { done: [], todo: [] } },
            ...rest,
        }))
    .case(actionCreators.addTask,
        ({ currentProject, projects, todo }, task) => {
            const project = projects[currentProject];

            return {
                currentProject,
                projects: {
                    ...projects, [currentProject]: {
                        ...project,
                        todo: [task, ...project.todo],
                    },
                },
                todo,
            };
        })
    .case(actionCreators.changeProjectName,
        ({ projects, ...rest }, { oldName, newName }) => ({
            projects: { ...omit(projects, oldName), [newName]: projects[oldName] },
            ...rest,
        }))
    .case(actionCreators.modifyTask,
        ({ currentProject, projects, todo }, task) => {
            const taskState = booleanToTaskState(todo);
            const project = projects[currentProject];
            const tasks = project[taskState];

            return {
                currentProject,
                projects: {
                    ...projects,
                    [currentProject]: {
                        ...project,
                        [taskState]: Object.assign(tasks, { [findIndex(tasks, { id: task.id })]: task }),
                    },
                },
                todo,
            };
        })
    .case(actionCreators.setCurrentProject,
        (state, currentProject) => ({ ...state, currentProject }))
    .case(actionCreators.toggleTaskState,
        ({ currentProject, projects, ...rest }, id) => {
            const project = projects[currentProject];
            const todo = !!find(project.todo, { id });

            let sourceTasks = project[booleanToTaskState(todo)];
            const destinationTasks = [
                find(sourceTasks, { id }),
                ...project[booleanToTaskState(!todo)],
            ];
            sourceTasks = reject(sourceTasks, { id });

            return {
                currentProject,
                projects: {
                    ...projects,
                    [currentProject]: {
                        done: todo ? destinationTasks : sourceTasks,
                        todo: todo ? sourceTasks : destinationTasks,
                    },
                },
                ...rest,
            };
        });

export const persistent = true;
