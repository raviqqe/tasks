import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

import { IProject } from "../domain/project";

const actionCreator = actionCreatorFactory("PROJECTS");

const addProject = actionCreator<string>("ADD_PROJECT");
const setCurrentProject = actionCreator<string>("SET_CURRENT_PROJECT");

export const actionCreators = {
    addProject,
    setCurrentProject,
};

export const initialState: { currentProject: string | null, projects: IProject[] } = {
    currentProject: null,
    projects: [],
};

export const reducer = reducerWithInitialState(initialState)
    .case(addProject,
        ({ projects, ...rest }, name) => ({
            projects: [{ name, tasks: [] }, ...projects],
            ...rest,
        }))
    .case(setCurrentProject, (state, currentProject) => ({ ...state, currentProject }));

export const persistent = true;
