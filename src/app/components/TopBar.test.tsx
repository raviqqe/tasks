import { atom } from "nanostores";
import { beforeEach, expect, it, vi } from "vitest";
import { projectPresenter } from "../../main/project-presenter.js";
import { renderRouter } from "../test.js";
import { TopBar } from "./TopBar.js";

beforeEach(() => {
  vi.spyOn(projectPresenter, "currentProject", "get").mockReturnValue(
    atom({ archived: false, id: "", name: "" }),
  );
});

it("renders", () => {
  expect(renderRouter(<TopBar />).container.firstChild).toMatchSnapshot();
});
