import { atom } from "nanostores";
import { expect, it, vi } from "vitest";
import { projectPresenter } from "../../main/project-presenter.js";
import { renderRouter } from "../test.js";
import { CurrentProject } from "./CurrentProject.js";

it("renders", () => {
  vi.spyOn(projectPresenter, "currentProject", "get").mockReturnValue(
    atom({
      archived: false,
      id: "",
      name: "",
    }),
  );

  expect(
    renderRouter(<CurrentProject />).container.firstChild,
  ).toMatchSnapshot();
});
