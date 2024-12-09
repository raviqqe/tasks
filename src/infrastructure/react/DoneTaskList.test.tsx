import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { DoneTaskList } from "./DoneTaskList.js";

it("renders", () => {
  expect(
    render(<DoneTaskList doneTasks={[]} />).container.firstChild,
  ).toMatchSnapshot();
});
