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
        tasks={[]}
        listTasks={async () => {}}
        listMoreTasks={async () => {}}
        signOut={async () => undefined}
        updateTask={async () => {}}
      />
    ).toJSON()
  ).toMatchSnapshot();
});
