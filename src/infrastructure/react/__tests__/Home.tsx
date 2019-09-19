import { cleanup } from "@testing-library/react";
import { create } from "react-test-renderer";
import React from "react";
import { Home } from "../Home";

afterEach(cleanup);

it("renders", () => {
  expect(
    create(
      <Home
        completeTodoTask={async () => {}}
        createTodoTask={async () => {}}
        currentProject={{ archived: false, id: "", name: "" }}
        doneTasks={[]}
        listMoreDoneTasks={async () => {}}
        projects={[]}
        signOut={async () => undefined}
        todoTasks={[]}
        updateTodoTask={async () => {}}
      />
    ).toJSON()
  ).toMatchSnapshot();
});
