import { fireEvent, render } from "@testing-library/react";
import { beforeEach, expect, it, type MockInstance, vi } from "vitest";
import type * as domain from "../../domain.js";
import { todoTaskUpdater } from "../../main/todo-task-updater.js";
import { Task } from "./Task.js";

let updateTask: MockInstance<(task: domain.Task) => Promise<void>>;

beforeEach(() => {
  updateTask = vi.spyOn(todoTaskUpdater, "update").mockResolvedValue(undefined);
});

it("renders", () => {
  expect(
    render(<Task editable task={{ id: "id", name: "name" }} />).container
      .firstChild,
  ).toMatchSnapshot();
});

it("updates a task", () => {
  vi.spyOn(window, "prompt").mockReturnValue("bar");

  const { container } = render(
    <Task editable task={{ id: "", name: "foo" }} />,
  );

  fireEvent.click(container.querySelector('[aria-label="Edit"]')!);

  expect(updateTask).toHaveBeenCalledTimes(1);
});

it("does not update any tasks if update is cancelled", () => {
  vi.spyOn(window, "prompt").mockReturnValue(null);

  const { container } = render(
    <Task editable task={{ id: "", name: "foo" }} />,
  );

  fireEvent.click(container.querySelector('[aria-label="Edit"]')!);

  expect(updateTask).not.toHaveBeenCalled();
});
