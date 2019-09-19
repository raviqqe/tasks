import { create } from "react-test-renderer";
import React from "react";
import { ToggleTasks } from "../ToggleTasks";

it("renders", () => {
  expect(
    create(<ToggleTasks setTasksDone={() => {}} tasksDone={false} />).toJSON()
  ).toMatchSnapshot();
});
