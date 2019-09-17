import { create } from "react-test-renderer";
import React from "react";
import { CreateTodoTask } from "../CreateTodoTask";

it("renders", () => {
  expect(
    create(<CreateTodoTask createTodoTask={async () => {}} />).toJSON()
  ).toMatchSnapshot();
});
