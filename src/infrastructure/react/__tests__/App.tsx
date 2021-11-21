import { act, render, waitFor } from "@testing-library/react";
import { App, IProps } from "../App";

const initialize = jest.fn();

beforeEach(() => {
  initialize.mockReset().mockResolvedValue(undefined);
});

const wait = () => waitFor(() => expect(initialize).toBeCalled());

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
  await act(async () => {
    expect(
      render(<App {...props} signedIn={null} />).container
    ).toMatchSnapshot();

    await wait();
  });
});

it("renders after a user signs in", async () => {
  await act(async () => {
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

    await wait();
  });
});

it("renders after a user signs out", async () => {
  await act(async () => {
    expect(
      render(<App {...props} signedIn={false} />).container
    ).toMatchSnapshot();

    await wait();
  });
});
