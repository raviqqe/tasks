import { find, findIndex, omit, reject } from "lodash";
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

import { booleanToTaskState, IProject } from "../domain/project";
import { createTask, ITask } from "../domain/task";

const actionCreator = actionCreatorFactory("PROJECTS");

const addProject = actionCreator<string>("ADD_PROJECT");
const addTask = actionCreator<ITask>("ADD_TASK");
const changeProjectName = actionCreator<{ oldName: string, newName: string }>("CHANGE_PROJECT_NAME");
const modifyTask = actionCreator<ITask>("MODIFY_TASK");
const setCurrentProject = actionCreator<string>("SET_CURRENT_PROJECT");
const toggleTaskState = actionCreator<string>("TOGGLE_TASK");

export const actionCreators = {
    addProject,
    addTask,
    changeProjectName,
    modifyTask,
    setCurrentProject,
    toggleTaskState,
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
    .case(addProject,
        ({ projects, ...rest }, name) => ({
            projects: { ...projects, [name]: { done: [], todo: [] } },
            ...rest,
        }))
    .case(addTask,
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
    .case(changeProjectName,
        ({ projects, ...rest }, { oldName, newName }) => ({
            projects: { ...omit(projects, oldName), [newName]: projects[oldName] },
            ...rest,
        }))
    .case(modifyTask,
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
    .case(setCurrentProject, (state, currentProject) => ({ ...state, currentProject }))
    .case(toggleTaskState, ({ currentProject, projects, ...rest }, id) => {
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
