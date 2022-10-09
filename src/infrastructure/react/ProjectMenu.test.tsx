import { ProjectMenu } from "./ProjectMenu";
import { it, expect } from "vitest";
import { render } from "@testing-library/react";

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
