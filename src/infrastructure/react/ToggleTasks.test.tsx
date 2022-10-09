import { ToggleTasks } from "./ToggleTasks";
import { it, expect } from "vitest";
import { render } from "@testing-library/react";

it("renders", () => {
  expect(
    render(<ToggleTasks setTasksDone={() => {}} tasksDone={false} />).container
      .firstChild
  ).toMatchSnapshot();
});
