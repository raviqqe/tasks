import { create } from "react-test-renderer";
import React from "react";
import { Tasks } from "../Tasks";

it("renders", () => {
  expect(
    create(
      <Tasks
        tasks={[{ id: "id", name: "name" }]}
        listTasks={async () => {}}
        listMoreTasks={async () => {}}
        updateTask={async () => {}}
      />
    ).toJSON()
  ).toMatchSnapshot();
});

it("renders with no tasks", () => {
  expect(
    create(
      <Tasks
        tasks={[]}
        listTasks={async () => {}}
        listMoreTasks={async () => {}}
        updateTask={async () => {}}
      />
    ).toJSON()
  ).toMatchSnapshot();
});

it("renders with tasks not loaded yet", () => {
  expect(
    create(
      <Tasks
        tasks={null}
        listTasks={async () => {}}
        listMoreTasks={async () => {}}
        updateTask={async () => {}}
      />
    ).toJSON()
  ).toMatchSnapshot();
});
