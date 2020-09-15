import { render } from "@testing-library/react";
import React from "react";
import { App, IProps } from "../App";

const props: IProps = {
  archiveProject: () => Promise.resolve(),
  archivedProjects: null,
  completeTodoTask: () => Promise.resolve(),
  createProject: () => Promise.resolve(),
  createTodoTask: () => Promise.resolve(),
  currentProject: null,
  deleteProject: () => Promise.resolve(),
  doneTasks: null,
  initialize: () => Promise.resolve(),
  listMoreDoneTasks: () => Promise.resolve(),
  projects: null,
  reorderTodoTasks: () => Promise.resolve(),
  repositoryURL: "",
  signIn: () => undefined,
  signOut: () => undefined,
  signedIn: null,
  switchCurrentProject: () => Promise.resolve(),
  todoTasks: null,
  unarchiveProject: () => Promise.resolve(),
  updateProject: () => Promise.resolve(),
  updateTodoTask: () => Promise.resolve(),
};

it("renders before a user signs in", () => {
  expect(
    render(<App {...props} signedIn={null} />).container
  ).toMatchSnapshot();
});

it("renders after a user signs in", () => {
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

it("renders after a user signs out", () => {
  expect(
    render(<App {...props} signedIn={false} />).container
  ).toMatchSnapshot();
});
