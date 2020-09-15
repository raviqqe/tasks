import React from "react";
import { create } from "react-test-renderer";
import { CreateTodoTask } from "../CreateTodoTask";

it("renders", () => {
  expect(
    create(<CreateTodoTask createTodoTask={async () => undefined} />).toJSON()
  ).toMatchSnapshot();
});
