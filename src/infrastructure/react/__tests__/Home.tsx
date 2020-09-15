import React from "react";
import { create } from "react-test-renderer";
import { Home } from "../Home";

it("renders", () => {
  expect(
    create(
      <Home
        completeTodoTask={() => Promise.resolve()}
        createTodoTask={() => Promise.resolve()}
        currentProject={{ archived: false, id: "", name: "" }}
        doneTasks={[]}
        listMoreDoneTasks={() => Promise.resolve()}
        reorderTodoTasks={() => Promise.resolve()}
        showProjects={() => undefined}
        signOut={() => Promise.resolve()}
        todoTasks={[]}
        updateTodoTask={() => Promise.resolve()}
      />
    ).toJSON()
  ).toMatchSnapshot();
});
