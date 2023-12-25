import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { DoneTasks } from "./DoneTaskList.js";

it("renders", () => {
  expect(
    render(<DoneTasks doneTasks={[]} listMoreDoneTasks={async () => {}} />)
      .container.firstChild,
  ).toMatchSnapshot();
});
