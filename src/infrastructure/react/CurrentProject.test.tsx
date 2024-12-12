import { render } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { CurrentProject } from "./CurrentProject.js";
import { projectPresenter } from "../../main/project-presenter.js";
import { atom } from "nanostores";

it("renders", () => {
  vi.spyOn(projectPresenter, "currentProject", "get").mockReturnValue(
    atom({
      archived: false,
      id: "",
      name: "",
    }),
  );

  expect(
    render(<CurrentProject onShowProjects={() => {}} />).container.firstChild,
  ).toMatchSnapshot();
});
