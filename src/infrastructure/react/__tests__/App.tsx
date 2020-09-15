import { render } from "@testing-library/react";
import React from "react";
import { App, IProps } from "../App";

const props: IProps = {
  archiveProject: async () => undefined,
  archivedProjects: null,
  completeTodoTask: async () => undefined,
  createProject: async () => undefined,
  createTodoTask: async () => undefined,
  currentProject: null,
  deleteProject: async () => undefined,
  doneTasks: null,
  initialize: async () => undefined,
  listMoreDoneTasks: async () => undefined,
  projects: null,
  reorderTodoTasks: async () => undefined,
  repositoryURL: "",
  signIn: () => undefined,
  signOut: () => undefined,
  signedIn: null,
  switchCurrentProject: async () => undefined,
  todoTasks: null,
  unarchiveProject: async () => undefined,
  updateProject: async () => undefined,
  updateTodoTask: async () => undefined,
};

it("renders before a user signs in", async () => {
  expect(
    render(<App {...props} signedIn={null} />).container
  ).toMatchSnapshot();
});

it("renders after a user signs in", async () => {
  expect(
    render(
      <App
        {...props}
        currentProject={{ archived: false, id: "", name: "" }}
        projects={[]}
        signedIn={true}
      />
    ).container
  ).toMatchSnapshot();
});

it("renders after a user signs out", async () => {
  expect(
    render(<App {...props} signedIn={false} />).container
  ).toMatchSnapshot();
});
