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
import { Store } from "redux";
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

import {
  emptyProject,
  getTasksFromProject,
  IProject,
  IProjects,
  isDoneTask,
  setTasksToProject
} from "../domain/project";
import { createTask, ITask, updateTask } from "../domain/task";
import * as firebase from "../infra/firebase";
import projectsRepository from "../infra/projects-repository";
import * as message from "./message";

const actionCreator = actionCreatorFactory("TASKS");

const originalAddOrModifyProject = actionCreator<{
  name: string;
  project: IProject;
}>("ADD_OR_MODIFY_PROJECT");
const originalRemoveProject = actionCreator<string>("REMOVE_PROJECT");
const setCurrentProjectName = actionCreator<string>("SET_CURRENT_PROJECT_NAME");
const setCurrentTaskId = actionCreator<string>("SET_CURRENT_TASK_ID");

function getCurrentProject(getState: () => { tasks: IState }): IProject {
  const { currentProjectName, projects } = getState().tasks;

  return projects[currentProjectName];
}

function getNumberOfUnarchivedProjects(
  getState: () => { tasks: IState }
): number {
  return size(omitBy(getState().tasks.projects, ({ archived }) => archived));
}

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
    if (getNumberOfUnarchivedProjects(getState) === 1) {
      dispatch(
        message.actionCreators.sendMessage(
          "You cannot delete the last project."
        )
      );
      return;
    }

    dispatch(originalRemoveProject(name));

    if (getState().authentication.signedIn) {
      projectsRepository.removeProject(name);
    }
  };
}

function modifyCurrentProject(project: IProject) {
  return (dispatch, getState) => {
    dispatch(addOrModifyProject(getState().tasks.currentProjectName, project));
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
  addTask: (task: ITask) => (dispatch, getState) => {
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
  modifyTask: (task: ITask) => (dispatch, getState) => {
    const project = getCurrentProject(getState);
    const done = isDoneTask(project, task.id);
    const tasks = [...getTasksFromProject(project, done)];

    tasks[findIndex(tasks, { id: task.id })] = updateTask(task);

    dispatch(modifyCurrentProject(setTasksToProject(project, tasks, done)));
  },
  removeProject,
  removeTask: (id: string) => (dispatch, getState) => {
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
  renameCurrentProject: (name: string) => (dispatch, getState) => {
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
  setTasks: (tasks: ITask[]) => (dispatch, getState) => {
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
  toggleProjectState: (name: string) => (dispatch, getState) => {
    const { currentProjectName, projects }: IState = getState().tasks;

    if (
      getNumberOfUnarchivedProjects(getState) === 1 &&
      name === currentProjectName
    ) {
      dispatch(
        message.actionCreators.sendMessage(
          "You cannot archive the last project."
        )
      );
      return;
    }

    const { archived, ...rest } = projects[name];

    dispatch(addOrModifyProject(name, { archived: !archived, ...rest }));

    if (name === currentProjectName) {
      dispatch(
        setCurrentProjectName(Object.keys(getState().tasks.projects)[0])
      );
    }
  },
  toggleTaskState: (id: string) => (dispatch, getState) => {
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
        archived: project.archived,
        doneTasks: done ? sourceTasks : destinationTasks,
        todoTasks: done ? destinationTasks : sourceTasks
      })
    );
  },
  updateProjects: actionCreator<IProjects>("UPDATE_PROJECTS")
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
  .case(
    originalRemoveProject,
    ({ currentProjectName, projects, ...rest }, name) => {
      const newProjects = omit(projects, name);

      return {
        currentProjectName:
          name === currentProjectName
            ? Object.keys(newProjects)[0]
            : currentProjectName,
        projects: newProjects,
        ...rest
      };
    }
  )
  .case(actionCreators.setCurrentProjectName, (state, currentProjectName) => ({
    ...state,
    currentProjectName
  }))
  .case(actionCreators.setCurrentTaskId, (state, currentTaskId) => ({
    ...state,
    currentTaskId
  }))
  .case(
    actionCreators.updateProjects,
    ({ currentProjectName, ...rest }, projects) => ({
      ...rest,
      currentProjectName: projects.hasOwnProperty(currentProjectName)
        ? currentProjectName
        : Object.keys(projects)[0],
      projects
    })
  );

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
