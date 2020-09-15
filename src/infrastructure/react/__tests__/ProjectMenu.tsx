import React from "react";
import { create } from "react-test-renderer";
import { ProjectMenu } from "../ProjectMenu";

it("renders", () => {
  expect(
    create(
      <ProjectMenu
        archiveProject={() => Promise.resolve()}
        archivedProjects={[]}
        createProject={() => Promise.resolve()}
        currentProject={{ archived: false, id: "", name: "" }}
        deleteProject={() => Promise.resolve()}
        hideProjects={() => undefined}
        projects={[]}
        switchCurrentProject={() => Promise.resolve()}
        unarchiveProject={() => Promise.resolve()}
        updateProject={() => Promise.resolve()}
      />
    ).toJSON()
  ).toMatchSnapshot();
});
