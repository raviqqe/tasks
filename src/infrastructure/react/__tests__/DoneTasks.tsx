import React from "react";
import { create } from "react-test-renderer";
import { DoneTasks } from "../DoneTasks";

it("renders", () => {
  expect(
    create(
      <DoneTasks doneTasks={[]} listMoreDoneTasks={async () => undefined} />
    ).toJSON()
  ).toMatchSnapshot();
});
