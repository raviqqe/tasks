import { render } from "@testing-library/react";
import { atom } from "nanostores";
import { expect, it, vi } from "vitest";
import { todoTaskPresenter } from "../../main/todo-task-presenter.js";
import { TodoTaskList } from "./TodoTaskList.js";

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
