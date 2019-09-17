import { create } from "react-test-renderer";
import React from "react";
import { TodoTasks } from "../TodoTasks";

it("renders", () => {
  expect(
    create(
      <TodoTasks
        todoTasks={[{ id: "id", name: "name" }]}
        updateTodoTask={async () => {}}
      />
    ).toJSON()
  ).toMatchSnapshot();
});

it("renders with no tasks", () => {
  expect(
    create(
      <TodoTasks todoTasks={[]} updateTodoTask={async () => {}} />
    ).toJSON()
  ).toMatchSnapshot();
});

it("renders with tasks not loaded yet", () => {
  expect(
    create(
      <TodoTasks todoTasks={null} updateTodoTask={async () => {}} />
    ).toJSON()
  ).toMatchSnapshot();
});
