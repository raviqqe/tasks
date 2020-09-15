import React from "react";
import { create } from "react-test-renderer";
import { TodoTasks } from "../TodoTasks";

it("renders", () => {
  expect(
    create(
      <TodoTasks
        completeTodoTask={async () => undefined}
        reorderTodoTasks={async () => undefined}
        todoTasks={[{ id: "id", name: "name" }]}
        updateTodoTask={async () => undefined}
      />
    ).toJSON()
  ).toMatchSnapshot();
});

it("renders with no tasks", () => {
  expect(
    create(
      <TodoTasks
        completeTodoTask={async () => undefined}
        reorderTodoTasks={async () => undefined}
        todoTasks={[]}
        updateTodoTask={async () => undefined}
      />
    ).toJSON()
  ).toMatchSnapshot();
});

it("renders with tasks not loaded yet", () => {
  expect(
    create(
      <TodoTasks
        completeTodoTask={async () => undefined}
        reorderTodoTasks={async () => undefined}
        todoTasks={null}
        updateTodoTask={async () => undefined}
      />
    ).toJSON()
  ).toMatchSnapshot();
});
