import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { ToggleTasks } from "./ToggleTasks.js";

it("renders", () => {
  expect(
    render(<ToggleTasks setTasksDone={() => {}} tasksDone={false} />).container
      .firstChild,
  ).toMatchSnapshot();
});
