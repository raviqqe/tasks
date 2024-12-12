import { render } from "@testing-library/react";
import { atom } from "nanostores";
import { beforeEach, expect, it, vi } from "vitest";
import { doneTaskPresenter } from "../../main/done-task-presenter.js";
import { DoneTaskList } from "./DoneTaskList.js";

beforeEach(() => {
  vi.spyOn(doneTaskPresenter, "tasks", "get").mockReturnValue(atom([]));
});

it("renders", () => {
  expect(render(<DoneTaskList />).container.firstChild).toMatchSnapshot();
});
