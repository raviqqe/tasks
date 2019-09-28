import { create } from "react-test-renderer";
import React from "react";
import { ProjectMenu } from "../ProjectMenu";

it("renders", () => {
  expect(
    create(
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
    ).toJSON()
  ).toMatchSnapshot();
});
