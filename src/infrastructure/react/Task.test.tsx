import { fireEvent, render } from "@testing-library/react";
import { beforeEach, expect, it, MockInstance, vi } from "vitest";
import { Task } from "./Task.js";
import { todoTaskUpdater } from "../../main/todo-task-updater.js";
import type * as domain from "../../domain.js";

let updateTask: MockInstance<(task: domain.Task) => Promise<void>>;

beforeEach(() => {
  updateTask = vi.spyOn(todoTaskUpdater, "update").mockResolvedValue(undefined);
});

it("renders", () => {
  expect(
    render(<Task task={{ id: "id", name: "name" }} editable />).container
      .firstChild,
  ).toMatchSnapshot();
});

it("updates a task", () => {
  vi.spyOn(window, "prompt").mockReturnValue("bar");

  const { container } = render(
    <Task task={{ id: "", name: "foo" }} editable />,
  );

  fireEvent.click(container.querySelector('[aria-label="Edit"]')!);

  expect(updateTask).toHaveBeenCalledTimes(1);
});

it("does not update any tasks if update is cancelled", () => {
  vi.spyOn(window, "prompt").mockReturnValue(null);

  const { container } = render(
    <Task task={{ id: "", name: "foo" }} editable />,
  );

  fireEvent.click(container.querySelector('[aria-label="Edit"]')!);

  expect(updateTask).not.toHaveBeenCalled();
});
