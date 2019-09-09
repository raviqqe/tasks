import { create } from "react-test-renderer";
import React from "react";
import { CreateTask } from "../CreateTask";

it("renders", () => {
  expect(
    create(<CreateTask createTask={async () => undefined} />).toJSON()
  ).toMatchSnapshot();
});
