import { create } from "react-test-renderer";
import React from "react";
import { Home } from "../Home";

it("renders", () => {
  expect(
    create(
      <Home
        completeTodoTask={async () => {}}
        createProject={async () => {}}
        createTodoTask={async () => {}}
        currentProject={{ archived: false, id: "", name: "" }}
        doneTasks={[]}
        listMoreDoneTasks={async () => {}}
        projects={[]}
        reorderTodoTasks={async () => {}}
        signOut={async () => undefined}
        switchCurrentProject={async () => {}}
        todoTasks={[]}
        updateTodoTask={async () => {}}
      />
    ).toJSON()
  ).toMatchSnapshot();
});
