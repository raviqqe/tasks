import { render } from "@testing-library/react";
import { it, expect } from "vitest";
import { ProjectMenu } from "./ProjectMenu";

it("renders", () => {
  expect(
    render(
      <ProjectMenu
        archiveProject={async () => {}}
        archivedProjects={[]}
        createProject={async () => {}}
        currentProject={{ archived: false, id: "", name: "" }}
        deleteProject={async () => {}}
        hideProjects={() => {}}
        projects={[]}
        switchCurrentProject={async () => {}}
        unarchiveProject={async () => {}}
        updateProject={async () => {}}
      />
    ).container.firstChild
  ).toMatchSnapshot();
});
