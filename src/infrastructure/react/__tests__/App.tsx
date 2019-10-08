import { render } from "@testing-library/react";
import React from "react";
import { App, IProps } from "../App";
import { AuthenticationStore } from "../../mobx/authentication-store";
import { ProjectsStore } from "../../mobx/projects-store";
import { TasksStore } from "../../mobx/tasks-store";

const commonProps: Omit<
  IProps,
  "authenticationStore" | "projectsStore" | "tasksStore"
> = {
  archiveProject: async () => {},
  completeTodoTask: async () => {},
  createProject: async () => {},
  createTodoTask: async () => {},
  deleteProject: async () => {},
  initialize: async () => {},
  listMoreDoneTasks: async () => {},
  reorderTodoTasks: async () => {},
  repositoryURL: "",
  signIn: () => {},
  signOut: () => {},
  switchCurrentProject: async () => {},
  unarchiveProject: async () => {},
  updateProject: async () => {},
  updateTodoTask: async () => {}
};

it("renders before a user signs in", async () => {
  const result = render(
    <App
      {...commonProps}
      authenticationStore={new AuthenticationStore()}
      projectsStore={new ProjectsStore()}
      tasksStore={new TasksStore()}
    />
  );

  expect(result.container).toMatchSnapshot();
});

it("renders after a user signs in", async () => {
  const authenticationStore = new AuthenticationStore();
  authenticationStore.setSignedIn(true);
  const projectsStore = new ProjectsStore();
  projectsStore.setCurrentProject({ archived: false, id: "", name: "" });
  projectsStore.setProjects([]);

  const result = render(
    <App
      {...commonProps}
      authenticationStore={authenticationStore}
      projectsStore={projectsStore}
      tasksStore={new TasksStore()}
    />
  );

  expect(result.container).toMatchSnapshot();
});

it("renders after a user signs out", async () => {
  const authenticationStore = new AuthenticationStore();
  authenticationStore.setSignedIn(false);

  const result = render(
    <App
      {...commonProps}
      authenticationStore={authenticationStore}
      projectsStore={new ProjectsStore()}
      tasksStore={new TasksStore()}
    />
  );

  expect(result.container).toMatchSnapshot();
});
