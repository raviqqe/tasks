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
      completeTodoTask={async () => {}}
      createProject={async () => {}}
      createTodoTask={async () => {}}
      initialize={async () => {}}
      listMoreDoneTasks={async () => {}}
      projectsStore={new ProjectsStore()}
      repositoryURL=""
      signIn={() => {}}
      signOut={() => {}}
      tasksStore={new TasksStore()}
      updateTodoTask={async () => {}}
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
      authenticationStore={authenticationStore}
      completeTodoTask={async () => {}}
      createProject={async () => {}}
      createTodoTask={async () => {}}
      initialize={async () => {}}
      listMoreDoneTasks={async () => {}}
      projectsStore={projectsStore}
      repositoryURL=""
      signIn={() => {}}
      signOut={() => {}}
      tasksStore={new TasksStore()}
      updateTodoTask={async () => {}}
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
      completeTodoTask={async () => {}}
      createProject={async () => {}}
      createTodoTask={async () => {}}
      initialize={async () => {}}
      listMoreDoneTasks={async () => {}}
      projectsStore={new ProjectsStore()}
      repositoryURL=""
      signIn={() => {}}
      signOut={() => {}}
      tasksStore={new TasksStore()}
      updateTodoTask={async () => {}}
    />
  );

  expect(result.container).toMatchSnapshot();
});
