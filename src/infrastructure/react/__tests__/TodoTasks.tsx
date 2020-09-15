import React from "react";
import { create } from "react-test-renderer";
import { TodoTasks } from "../TodoTasks";

it("renders", () => {
  expect(
    create(
      <TodoTasks
        completeTodoTask={() => Promise.resolve()}
        reorderTodoTasks={() => Promise.resolve()}
        todoTasks={[{ id: "id", name: "name" }]}
        updateTodoTask={() => Promise.resolve()}
      />
    ).toJSON()
  ).toMatchSnapshot();
});

it("renders with no tasks", () => {
  expect(
    create(
      <TodoTasks
        completeTodoTask={() => Promise.resolve()}
        reorderTodoTasks={() => Promise.resolve()}
        todoTasks={[]}
        updateTodoTask={() => Promise.resolve()}
      />
    ).toJSON()
  ).toMatchSnapshot();
});

it("renders with tasks not loaded yet", () => {
  expect(
    create(
      <TodoTasks
        completeTodoTask={() => Promise.resolve()}
        reorderTodoTasks={() => Promise.resolve()}
        todoTasks={null}
        updateTodoTask={() => Promise.resolve()}
      />
    ).toJSON()
  ).toMatchSnapshot();
});
