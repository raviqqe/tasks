import { act, render, RenderResult, waitFor } from "@testing-library/react";
import { App, IProps } from "./App";
import { beforeEach, expect, it, vi } from "vitest";

const initialize = vi.fn();

beforeEach(() => {
  initialize.mockReset().mockResolvedValue(undefined);
});

const wait = () => waitFor(() => expect(initialize).toHaveBeenCalled());

const props: IProps = {
  archiveProject: async () => {},
  archivedProjects: null,
  completeTodoTask: async () => {},
  createProject: async () => {},
  createTodoTask: async () => {},
  currentProject: null,
  deleteProject: async () => {},
  doneTasks: null,
  initialize,
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
  let result: RenderResult | undefined;

  act(() => {
    result = render(<App {...props} signedIn={null} />);
  });

  expect(result?.container).toMatchSnapshot();

  await wait();
});

it("renders after a user signs in", async () => {
  let result: RenderResult | undefined;

  act(() => {
    result = render(
      <App
        {...props}
        currentProject={{ archived: false, id: "", name: "" }}
        projects={[]}
        signedIn={true}
      />
    );
  });

  expect(result?.container).toMatchSnapshot();

  await wait();
});

it("renders after a user signs out", async () => {
  let result: RenderResult | undefined;

  act(() => {
    result = render(<App {...props} signedIn={false} />);
  });

  expect(result?.container).toMatchSnapshot();

  await wait();
});
