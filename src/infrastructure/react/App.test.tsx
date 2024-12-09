import {
  act,
  render,
  type RenderResult,
  waitFor,
} from "@testing-library/react";
import { beforeEach, expect, it, vi } from "vitest";
import { applicationInitializer } from "../../main/application-initializer.js";
import { App, type Props } from "./App.js";

let wait = async () => {};

beforeEach(() => {
  const initialize = vi
    .spyOn(applicationInitializer, "initialize")
    .mockResolvedValue(undefined);
  wait = () => waitFor(() => expect(initialize).toHaveBeenCalled());
});

const props: Props = {
  archivedProjects: null,
  currentProject: null,
  doneTasks: null,
  projects: null,
  signedIn: null,
  todoTasks: null,
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
