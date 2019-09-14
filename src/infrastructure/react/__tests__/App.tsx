import { render } from "@testing-library/react";
import React from "react";
import { App } from "../App";
import { AuthenticationStore } from "../../mobx/authentication-store";
import { ProjectsStore } from "../../mobx/projects-store";
import { TasksStore } from "../../mobx/tasks-store";

it("renders before a user signs in", async () => {
  const result = render(
    <App
      authenticationStore={new AuthenticationStore()}
      projectsStore={new ProjectsStore()}
      tasksStore={new TasksStore()}
      createTask={async () => {}}
      initialize={async () => {}}
      listTasks={async () => {}}
      listMoreTasks={async () => {}}
      signIn={() => {}}
      signOut={() => {}}
      updateTask={async () => {}}
      repositoryURL=""
    />
  );

  expect(result.container).toMatchSnapshot();
});

it("renders after a user signs in", async () => {
  const authenticationStore = new AuthenticationStore();
  authenticationStore.setSignedIn(true);
  const projectsStore = new ProjectsStore();
  projectsStore.setCurrentProject({ id: "", name: "", taskIDs: [] });
  projectsStore.setProjects([]);

  const result = render(
    <App
      authenticationStore={authenticationStore}
      projectsStore={projectsStore}
      tasksStore={new TasksStore()}
      createTask={async () => {}}
      initialize={async () => {}}
      listTasks={async () => {}}
      listMoreTasks={async () => {}}
      signIn={() => {}}
      signOut={() => {}}
      updateTask={async () => {}}
      repositoryURL=""
    />
  );

  expect(result.container).toMatchSnapshot();
});

it("renders after a user signs out", async () => {
  const authenticationStore = new AuthenticationStore();
  authenticationStore.setSignedIn(false);

  const result = render(
    <App
      authenticationStore={authenticationStore}
      projectsStore={new ProjectsStore()}
      tasksStore={new TasksStore()}
      createTask={async () => {}}
      initialize={async () => {}}
      listTasks={async () => {}}
      listMoreTasks={async () => {}}
      signIn={() => {}}
      signOut={() => {}}
      updateTask={async () => {}}
      repositoryURL=""
    />
  );

  expect(result.container).toMatchSnapshot();
});
