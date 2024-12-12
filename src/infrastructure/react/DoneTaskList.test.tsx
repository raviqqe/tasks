import { render } from "@testing-library/react";
import { beforeEach, expect, it, vi } from "vitest";
import { DoneTaskList } from "./DoneTaskList.js";
import { atom } from "nanostores";
import { doneTaskPresenter } from "../../main/done-task-presenter.js";

beforeEach(() => {
  vi.spyOn(doneTaskPresenter, "tasks", "get").mockReturnValue(atom([]));
});

it("renders", () => {
  expect(render(<DoneTaskList />).container.firstChild).toMatchSnapshot();
});
