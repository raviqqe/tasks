import React from "react";
import { create } from "react-test-renderer";
import { ProjectMenu } from "../ProjectMenu";

it("renders", () => {
  expect(
    create(
      <ProjectMenu
        archiveProject={async () => undefined}
        archivedProjects={[]}
        createProject={async () => undefined}
        currentProject={{ archived: false, id: "", name: "" }}
        deleteProject={async () => undefined}
        hideProjects={() => undefined}
        projects={[]}
        switchCurrentProject={async () => undefined}
        unarchiveProject={async () => undefined}
        updateProject={async () => undefined}
      />
    ).toJSON()
  ).toMatchSnapshot();
});
