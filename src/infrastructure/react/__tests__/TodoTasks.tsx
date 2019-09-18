import { create } from "react-test-renderer";
import React from "react";
import { TodoTasks } from "../TodoTasks";

it("renders", () => {
  expect(
    create(
      <TodoTasks
        completeTodoTask={async () => {}}
        todoTasks={[{ id: "id", name: "name" }]}
        updateTodoTask={async () => {}}
      />
    ).toJSON()
  ).toMatchSnapshot();
});

it("renders with no tasks", () => {
  expect(
    create(
      <TodoTasks
        completeTodoTask={async () => {}}
        todoTasks={[]}
        updateTodoTask={async () => {}}
      />
    ).toJSON()
  ).toMatchSnapshot();
});

it("renders with tasks not loaded yet", () => {
  expect(
    create(
      <TodoTasks
        completeTodoTask={async () => {}}
        todoTasks={null}
        updateTodoTask={async () => {}}
      />
    ).toJSON()
  ).toMatchSnapshot();
});
