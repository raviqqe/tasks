import React from "react";
import { create } from "react-test-renderer";
import { Task } from "../Task";

it("renders", () => {
  expect(
    create(
      <Task task={{ id: "id", name: "name" }} updateTask={async () => {}} />
    ).toJSON()
  ).toMatchSnapshot();
});
