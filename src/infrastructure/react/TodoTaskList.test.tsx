import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { TodoTaskList } from "./TodoTaskList.js";

it("renders", () => {
  expect(
    render(
      <TodoTaskList
        completeTodoTask={async () => {}}
        reorderTodoTasks={async () => {}}
        todoTasks={[{ id: "id", name: "name" }]}
        updateTodoTask={async () => {}}
      />,
    ).container.firstChild,
  ).toMatchSnapshot();
});

it("renders with no tasks", () => {
  expect(
    render(
      <TodoTaskList
        completeTodoTask={async () => {}}
        reorderTodoTasks={async () => {}}
        todoTasks={[]}
        updateTodoTask={async () => {}}
      />,
    ).container.firstChild,
  ).toMatchSnapshot();
});

it("renders with tasks not loaded yet", () => {
  expect(
    render(
      <TodoTaskList
        completeTodoTask={async () => {}}
        reorderTodoTasks={async () => {}}
        todoTasks={null}
        updateTodoTask={async () => {}}
      />,
    ).container.firstChild,
  ).toMatchSnapshot();
});
