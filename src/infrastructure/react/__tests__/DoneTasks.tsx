import { create } from "react-test-renderer";
import React from "react";
import { DoneTasks } from "../DoneTasks";

it("renders", () => {
  expect(
    create(
      <DoneTasks doneTasks={[]} listMoreDoneTasks={async () => {}} />
    ).toJSON()
  ).toMatchSnapshot();
});
