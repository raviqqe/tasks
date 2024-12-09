import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { TodoTaskList } from "./TodoTaskList.js";

it("renders", () => {
  expect(
    render(<TodoTaskList todoTasks={[{ id: "id", name: "name" }]} />).container
      .firstChild,
  ).toMatchSnapshot();
});

it("renders with no tasks", () => {
  expect(
    render(<TodoTaskList todoTasks={[]} />).container.firstChild,
  ).toMatchSnapshot();
});

it("renders with tasks not loaded yet", () => {
  expect(
    render(<TodoTaskList todoTasks={null} />).container.firstChild,
  ).toMatchSnapshot();
});
