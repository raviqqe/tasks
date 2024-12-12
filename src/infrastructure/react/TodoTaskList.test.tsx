import { render } from "@testing-library/react";
import { beforeEach, expect, it, vi } from "vitest";
import { TodoTaskList } from "./TodoTaskList.js";
import { todoTaskPresenter } from "../../main/todo-task-presenter.js";
import { atom } from "nanostores";

beforeEach(() => {});

it("renders", () => {
  vi.spyOn(todoTaskPresenter, "tasks", "get").mockReturnValue(
    atom([{ id: "id", name: "name" }]),
  );

  expect(render(<TodoTaskList />).container.firstChild).toMatchSnapshot();
});

it("renders with no tasks", () => {
  vi.spyOn(todoTaskPresenter, "tasks", "get").mockReturnValue(atom([]));

  expect(render(<TodoTaskList />).container.firstChild).toMatchSnapshot();
});

it("renders with tasks not loaded yet", () => {
  vi.spyOn(todoTaskPresenter, "tasks", "get").mockReturnValue(atom(null));

  expect(render(<TodoTaskList />).container.firstChild).toMatchSnapshot();
});
