import { render } from "@testing-library/react";
import { it, expect } from "vitest";
import { TodoTasks } from "./TodoTasks";

it("renders", () => {
  expect(
    render(
      <TodoTasks
        completeTodoTask={async () => {}}
        reorderTodoTasks={async () => {}}
        todoTasks={[{ id: "id", name: "name" }]}
        updateTodoTask={async () => {}}
      />
    ).container.firstChild
  ).toMatchSnapshot();
});

it("renders with no tasks", () => {
  expect(
    render(
      <TodoTasks
        completeTodoTask={async () => {}}
        reorderTodoTasks={async () => {}}
        todoTasks={[]}
        updateTodoTask={async () => {}}
      />
    ).container.firstChild
  ).toMatchSnapshot();
});

it("renders with tasks not loaded yet", () => {
  expect(
    render(
      <TodoTasks
        completeTodoTask={async () => {}}
        reorderTodoTasks={async () => {}}
        todoTasks={null}
        updateTodoTask={async () => {}}
      />
    ).container.firstChild
  ).toMatchSnapshot();
});
