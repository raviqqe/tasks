import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

import { IProject } from "../domain/project";

const actionCreator = actionCreatorFactory("PROJECTS");

const addProject = actionCreator<string>("ADD_PROJECT");

export const actionCreators = {
    addProject,
};

export const initialState: { projects: IProject[] } = { projects: [] };

export const reducer = reducerWithInitialState(initialState)
    .case(addProject,
        ({ projects }, name) => ({ projects: [...projects, { name, tasks: [] }] }));

export const persistent = true;
