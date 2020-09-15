import React from "react";
import { create } from "react-test-renderer";
import { ToggleTasks } from "../ToggleTasks";

it("renders", () => {
  expect(
    create(
      <ToggleTasks setTasksDone={() => {}} tasksDone={false} />
    ).toJSON()
  ).toMatchSnapshot();
});
