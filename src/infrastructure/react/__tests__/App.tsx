import { render } from "@testing-library/react";
import React from "react";
import { App, IProps } from "../App";

const props: IProps = {
  archiveProject: async () => {},
  archivedProjects: null,
  completeTodoTask: async () => {},
  createProject: async () => {},
  createTodoTask: async () => {},
  currentProject: null,
  deleteProject: async () => {},
  doneTasks: null,
  initialize: async () => {},
  listMoreDoneTasks: async () => {},
  projects: null,
  reorderTodoTasks: async () => {},
  repositoryURL: "",
  signIn: () => {},
  signOut: () => {},
  signedIn: null,
  switchCurrentProject: async () => {},
  todoTasks: null,
  unarchiveProject: async () => {},
  updateProject: async () => {},
  updateTodoTask: async () => {},
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
