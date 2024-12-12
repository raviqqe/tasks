import { act, render, waitFor } from "@testing-library/react";
import { atom } from "nanostores";
import { beforeEach, expect, it, vi } from "vitest";
import { applicationInitializer } from "../../main/application-initializer.js";
import { authenticationPresenter } from "../../main/authentication-presenter.js";
import { App, type Props } from "./App.js";

let wait = async () => {};

beforeEach(() => {
  const initialize = vi
    .spyOn(applicationInitializer, "initialize")
    .mockResolvedValue(undefined);
  wait = () => waitFor(() => expect(initialize).toHaveBeenCalled());
});

const props: Props = {
  doneTasks: null,
  todoTasks: null,
};

it("renders before a user signs in", async () => {
  vi.spyOn(authenticationPresenter, "signedIn", "get").mockReturnValue(
    atom(null),
  );

  const result = await act(async () => render(<App {...props} />));

  expect(result.container).toMatchSnapshot();

  await wait();
});

it("renders after a user signs in", async () => {
  vi.spyOn(authenticationPresenter, "signedIn", "get").mockReturnValue(
    atom(true),
  );

  const result = await act(async () => render(<App {...props} />));

  expect(result.container).toMatchSnapshot();

  await wait();
});

it("renders after a user signs out", async () => {
  vi.spyOn(authenticationPresenter, "signedIn", "get").mockReturnValue(
    atom(false),
  );

  const result = await act(async () => render(<App {...props} />));

  expect(result.container).toMatchSnapshot();

  await wait();
});
