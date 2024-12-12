import { render } from "@testing-library/react";
import { atom } from "nanostores";
import { beforeEach, expect, it, vi } from "vitest";
import { projectPresenter } from "../../main/project-presenter.js";
import { Home } from "./Home.js";

beforeEach(() => {
  vi.spyOn(projectPresenter, "currentProject", "get").mockReturnValue(
    atom({ archived: false, id: "", name: "" }),
  );
  vi.spyOn(projectPresenter, "archivedProjects", "get").mockReturnValue(
    atom([]),
  );
  vi.spyOn(projectPresenter, "projects", "get").mockReturnValue(atom([]));
});

it("renders", () => {
  expect(
    render(<Home doneTasks={[]} onShowProjects={() => {}} todoTasks={[]} />)
      .container.firstChild,
  ).toMatchSnapshot();
});
