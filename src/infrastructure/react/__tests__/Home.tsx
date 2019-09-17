import { cleanup } from "@testing-library/react";
import { create } from "react-test-renderer";
import React from "react";
import { Home } from "../Home";

afterEach(cleanup);

it("renders", () => {
  expect(
    create(
      <Home
        createTodoTask={async () => {}}
        currentProject={{ archived: false, id: "", name: "" }}
        signOut={async () => undefined}
        projects={[]}
        todoTasks={[]}
        updateTodoTask={async () => {}}
      />
    ).toJSON()
  ).toMatchSnapshot();
});
