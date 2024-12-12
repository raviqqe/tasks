import { render } from "@testing-library/react";
import { atom } from "nanostores";
import { beforeEach, expect, it, vi } from "vitest";
import { projectPresenter } from "../../main/project-presenter.js";
import { ProjectMenu } from "./ProjectMenu.js";

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
