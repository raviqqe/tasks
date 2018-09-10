import {
  difference,
  find,
  findIndex,
  isEqual,
  omit,
  omitBy,
  reject,
  size
} from "lodash";
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

import { IGlobalState, Store, ThunkAction } from ".";
import {
  emptyProject,
  getTasksFromProject,
  IProject,
  IProjects,
  isDoneTask,
  setTasksToProject
} from "../domain/project";
import { ITask, updateTask } from "../domain/task";
import * as firebase from "../infra/firebase";
import projectsRepository from "../infra/projects-repository";
import * as message from "./message";

const actionCreator = actionCreatorFactory("TASKS");

const originalAddOrModifyProject = actionCreator<{
  name: string;
  project: IProject;
}>("ADD_OR_MODIFY_PROJECT");
const originalRemoveProject = actionCreator<string>("REMOVE_PROJECT");
const originalUpdateProjects = actionCreator<IProjects>("UPDATE_PROJECTS");
const setCurrentProjectName = actionCreator<string>("SET_CURRENT_PROJECT_NAME");
const setCurrentTaskId = actionCreator<string | null>("SET_CURRENT_TASK_ID");

function getCurrentProject(getState: () => IGlobalState): IProject {
  const { currentProjectName, projects } = getState().tasks;

  return projects[currentProjectName];
}

function getNumberOfUnarchivedProjects(getState: () => IGlobalState): number {
  return size(omitBy(getState().tasks.projects, ({ archived }) => archived));
}

function addOrModifyProject(name: string, project: IProject): ThunkAction {
  return (dispatch, getState) => {
    dispatch(originalAddOrModifyProject({ name, project }));

    if (getState().authentication.signedIn) {
      projectsRepository.addOrModifyProject(name, project);
    }
  };
}

function removeProject(name: string): ThunkAction {
  return (dispatch, getState) => {
    if (getNumberOfUnarchivedProjects(getState) === 1) {
      dispatch(
        message.actionCreators.sendMessage(
          "You cannot delete the last project."
        )
      );
      return;
    }

    dispatch(originalRemoveProject(name));
    dispatch(renewCurrentProjectName());

    if (getState().authentication.signedIn) {
      projectsRepository.removeProject(name);
    }
  };
}

function modifyCurrentProject(project: IProject): ThunkAction {
  return (dispatch, getState) => {
    dispatch(addOrModifyProject(getState().tasks.currentProjectName, project));
  };
}

function renewCurrentProjectName(): ThunkAction {
  return (dispatch, getState) => {
    const { currentProjectName, projects }: IState = getState().tasks;
    const currentProject = projects[currentProjectName];

    if (!currentProject || currentProject.archived) {
      dispatch(
        setCurrentProjectName(
          Object.keys(omitBy(projects, ({ archived }) => archived))[0]
        )
      );
    }
  };
}

export const actionCreators = {
  addProject: (name: string) => dispatch => {
    if (!name) {
      dispatch(
        message.actionCreators.sendMessage("Project names cannot be empty.")
      );
      return;
    }

    dispatch(addOrModifyProject(name, emptyProject));
    dispatch(setCurrentProjectName(name));
  },
  addTask: (task: ITask): ThunkAction => (dispatch, getState) => {
    if (!task.name) {
      dispatch(
        message.actionCreators.sendMessage("Task name cannot be empty.")
      );
      return;
    }

    const project = getCurrentProject(getState);

    dispatch(
      modifyCurrentProject({
        ...project,
        todoTasks: [task, ...project.todoTasks]
      })
    );
    dispatch(setCurrentTaskId(task.id));
  },
  archiveProject: (name: string): ThunkAction => (dispatch, getState) => {
    if (getNumberOfUnarchivedProjects(getState) === 1) {
      dispatch(
        message.actionCreators.sendMessage(
          "You cannot archive the last project."
        )
      );
      return;
    }

    dispatch(
      addOrModifyProject(name, {
        ...getState().tasks.projects[name],
        archived: true
      })
    );
    dispatch(renewCurrentProjectName());
  },
  modifyTask: (task: ITask): ThunkAction => (dispatch, getState) => {
    const project = getCurrentProject(getState);
    const done = isDoneTask(project, task.id);
    const tasks = [...getTasksFromProject(project, done)];

    tasks[findIndex(tasks, { id: task.id })] = updateTask(task);

    dispatch(modifyCurrentProject(setTasksToProject(project, tasks, done)));
  },
  removeProject,
  removeTask: (id: string): ThunkAction => (dispatch, getState) => {
    const project = getCurrentProject(getState);
    const done = isDoneTask(project, id);

    dispatch(
      modifyCurrentProject(
        setTasksToProject(
          project,
          reject(getTasksFromProject(project, done), { id }),
          done
        )
      )
    );
  },
  renameCurrentProject: (name: string): ThunkAction => (dispatch, getState) => {
    const { currentProjectName, projects } = getState().tasks;

    if (name === currentProjectName) {
      return;
    }

    dispatch(addOrModifyProject(name, projects[currentProjectName]));
    dispatch(removeProject(currentProjectName));
    dispatch(setCurrentProjectName(name));
  },
  setCurrentProjectName,
  setCurrentTaskId,
  setTasks: (tasks: ITask[]): ThunkAction => (dispatch, getState) => {
    if (tasks.length === 0) {
      return;
    }

    const project = getCurrentProject(getState);

    dispatch(
      modifyCurrentProject(
        setTasksToProject(project, tasks, isDoneTask(project, tasks[0].id))
      )
    );
  },
  toggleTaskState: (id: string): ThunkAction => (dispatch, getState) => {
    const project = getCurrentProject(getState);
    const done = isDoneTask(project, id);

    let sourceTasks = getTasksFromProject(project, done);
    const destinationTasks = [
      updateTask(find(sourceTasks, { id })),
      ...getTasksFromProject(project, !done)
    ];
    sourceTasks = reject(sourceTasks, { id });

    dispatch(
      modifyCurrentProject({
        archived: !!project.archived,
        doneTasks: done ? sourceTasks : destinationTasks,
        todoTasks: done ? destinationTasks : sourceTasks
      })
    );
  },
  unarchiveProject: (name: string): ThunkAction => (dispatch, getState) => {
    dispatch(
      addOrModifyProject(name, {
        ...getState().tasks.projects[name],
        archived: false
      })
    );
    dispatch(setCurrentProjectName(name));
  },
  updateProjects: (projects: IProjects): ThunkAction => (
    dispatch,
    getState
  ) => {
    dispatch(originalUpdateProjects(projects));
    dispatch(renewCurrentProjectName());
  }
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
  projects: { [defaultProjectName]: emptyProject }
};

export const reducer = reducerWithInitialState(initialState)
  .case(
    originalAddOrModifyProject,
    ({ projects, ...rest }, { name, project }) => ({
      projects: { ...projects, [name]: project },
      ...rest
    })
  )
  .case(originalRemoveProject, ({ projects, ...rest }, name) => ({
    projects: omit(projects, name),
    ...rest
  }))
  .case(actionCreators.setCurrentProjectName, (state, currentProjectName) => ({
    ...state,
    currentProjectName
  }))
  .case(actionCreators.setCurrentTaskId, (state, currentTaskId) => ({
    ...state,
    currentTaskId
  }))
  .case(originalUpdateProjects, (state, projects) => ({
    ...state,
    projects
  }));

export const persistent = true;

export function initializeStore(store: Store): void {
  firebase.onAuthStateChanged(async user => {
    // Only `actionCreators.updateProjects()` can be used here to avoid update loop.

    if (user) {
      const getProjects: () => IProjects = () =>
        store.getState().tasks.projects;
      let localProjects = getProjects();
      const remoteProjects = await projectsRepository.getProjects();

      if (
        localProjects.hasOwnProperty(defaultProjectName) &&
        isEqual(localProjects[defaultProjectName], emptyProject) &&
        size(localProjects) + size(remoteProjects) !== 1
      ) {
        localProjects = omit(localProjects, defaultProjectName);
      }

      for (const name of difference(
        Object.keys(localProjects),
        Object.keys(remoteProjects)
      )) {
        projectsRepository.addOrModifyProject(name, localProjects[name]);
      }

      store.dispatch(
        actionCreators.updateProjects({ ...localProjects, ...remoteProjects })
      );

      projectsRepository.subscribeProjects(
        (name: string, project: IProject) =>
          store.dispatch(
            actionCreators.updateProjects({ ...getProjects(), [name]: project })
          ),
        (name: string) =>
          store.dispatch(
            actionCreators.updateProjects(omit(getProjects(), name))
          )
      );
    } else {
      projectsRepository.unsubscribeProjects();
    }
  });
}
