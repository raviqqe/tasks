import {
  act,
  render,
  type RenderResult,
  waitFor,
} from "@testing-library/react";
import { beforeEach, expect, it, vi } from "vitest";
import { App, type Props } from "./App.js";

const initialize = vi.fn();

beforeEach(() => {
  initialize.mockReset().mockResolvedValue(undefined);
});

const wait = () => waitFor(() => expect(initialize).toHaveBeenCalled());

const props: Props = {
  archivedProjects: null,
  archiveProject: async () => {},
  completeTodoTask: async () => {},
  createProject: async () => {},
  createTodoTask: async () => {},
  currentProject: null,
  deleteProject: async () => {},
  doneTasks: null,
  initialize,
  initializeCurrentProject: async () => {},
  listMoreDoneTasks: async () => {},
  projects: null,
  reorderTodoTasks: async () => {},
  repositoryUrl: "",
  signedIn: null,
  signIn: () => {},
  signOut: () => {},
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
        signedIn
      />,
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
