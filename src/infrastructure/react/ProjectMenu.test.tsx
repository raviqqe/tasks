import { render } from "@testing-library/react";
import { beforeEach, expect, it, vi } from "vitest";
import { ProjectMenu } from "./ProjectMenu.js";
import { atom } from "nanostores";
import { projectPresenter } from "../../main/project-presenter.js";

beforeEach(() => {
  vi.spyOn(projectPresenter, "currentProject", "get").mockReturnValue(
    atom({ archived: false, id: "", name: "" }),
  );
});

it("renders", () => {
  expect(
    render(<ProjectMenu onHideProjects={() => {}} />).container.firstChild,
  ).toMatchSnapshot();
});
