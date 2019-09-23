import { create } from "react-test-renderer";
import React from "react";
import { Home } from "../Home";

it("renders", () => {
  expect(
    create(
      <Home
        completeTodoTask={async () => {}}
        createTodoTask={async () => {}}
        currentProject={{ archived: false, id: "", name: "" }}
        doneTasks={[]}
        listMoreDoneTasks={async () => {}}
        reorderTodoTasks={async () => {}}
        showProjects={() => {}}
        signOut={async () => {}}
        todoTasks={[]}
        updateTodoTask={async () => {}}
      />
    ).toJSON()
  ).toMatchSnapshot();
});
