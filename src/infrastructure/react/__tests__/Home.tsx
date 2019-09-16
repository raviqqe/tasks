import { cleanup } from "@testing-library/react";
import { create } from "react-test-renderer";
import React from "react";
import { Home } from "../Home";

afterEach(cleanup);

it("renders", () => {
  expect(
    create(
      <Home
        createTask={async () => {}}
        currentProject={{ archived: false, id: "", name: "" }}
        listMoreTasks={async () => {}}
        listTasks={async () => {}}
        signOut={async () => undefined}
        projects={[]}
        tasks={[]}
        updateTask={async () => {}}
      />
    ).toJSON()
  ).toMatchSnapshot();
});
