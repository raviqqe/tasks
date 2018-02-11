import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

import { ITask } from "../domain/task";

const actionCreator = actionCreatorFactory("PROJECTS");

const addProject = actionCreator<string>("ADD_PROJECT");
const setCurrentProject = actionCreator<string>("SET_CURRENT_PROJECT");

export const actionCreators = {
    addProject,
    setCurrentProject,
};

interface IState {
    currentProject: string | null;
    projects: { [name: string]: ITask[] };
}

export const initialState: IState = {
    currentProject: null,
    projects: {},
};

export const reducer = reducerWithInitialState(initialState)
    .case(addProject,
        ({ projects, ...rest }, name) => ({
            projects: { ...projects, [name]: [] },
            ...rest,
        }))
    .case(setCurrentProject, (state, currentProject) => ({ ...state, currentProject }));

export const persistent = true;
