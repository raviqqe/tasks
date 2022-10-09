import { render } from "@testing-library/react";
import { it, expect } from "vitest";
import { ToggleTasks } from "./ToggleTasks";

it("renders", () => {
  expect(
    render(<ToggleTasks setTasksDone={() => {}} tasksDone={false} />).container
      .firstChild
  ).toMatchSnapshot();
});
