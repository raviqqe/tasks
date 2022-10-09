import { DoneTasks } from "./DoneTasks";
import { expect, it } from "vitest";
import { render } from "@testing-library/react";

it("renders", () => {
  expect(
    render(<DoneTasks doneTasks={[]} listMoreDoneTasks={async () => {}} />)
      .container.firstChild
  ).toMatchSnapshot();
});
