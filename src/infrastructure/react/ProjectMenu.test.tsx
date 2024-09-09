import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { ProjectMenu } from "./ProjectMenu.js";

it("renders", () => {
  expect(
    render(
      <ProjectMenu
        archivedProjects={[]}
        archiveProject={async () => {}}
        createProject={async () => {}}
        currentProject={{ archived: false, id: "", name: "" }}
        deleteProject={async () => {}}
        hideProjects={() => {}}
        projects={[]}
        switchCurrentProject={async () => {}}
        unarchiveProject={async () => {}}
        updateProject={async () => {}}
      />,
    ).container.firstChild,
  ).toMatchSnapshot();
});
