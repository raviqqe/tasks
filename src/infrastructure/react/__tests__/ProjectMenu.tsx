import React from "react";
import { create } from "react-test-renderer";
import { ProjectMenu } from "../ProjectMenu";

it("renders", () => {
  expect(
    create(
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
      />
    ).toJSON()
  ).toMatchSnapshot();
});
