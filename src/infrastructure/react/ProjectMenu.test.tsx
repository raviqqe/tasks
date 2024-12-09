import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { ProjectMenu } from "./ProjectMenu.js";

it("renders", () => {
  expect(
    render(
      <ProjectMenu
        archivedProjects={[]}
        currentProject={{ archived: false, id: "", name: "" }}
        onHideProjects={() => {}}
        projects={[]}
      />,
    ).container.firstChild,
  ).toMatchSnapshot();
});
