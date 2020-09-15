import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { create } from "react-test-renderer";
import { Task } from "../Task";

it("renders", () => {
  expect(
    create(
      <Task
        task={{ id: "id", name: "name" }}
        updateTask={async () => undefined}
      />
    ).toJSON()
  ).toMatchSnapshot();
});

it("updates a task", () => {
  jest.spyOn(window, "prompt").mockReturnValue("bar");
  const updateTask = jest.fn();

  const { container } = render(
    <Task task={{ id: "", name: "foo" }} updateTask={updateTask} />
  );

  fireEvent.click(container.querySelector(`[aria-label="Edit"]`) as Element);

  expect(updateTask).toBeCalledTimes(1);
});

it("does not update any tasks if update is cancelled", () => {
  jest.spyOn(window, "prompt").mockReturnValue(null);
  const updateTask = jest.fn();

  const { container } = render(
    <Task task={{ id: "", name: "foo" }} updateTask={updateTask} />
  );

  fireEvent.click(container.querySelector(`[aria-label="Edit"]`) as Element);

  expect(updateTask).not.toBeCalled();
});
