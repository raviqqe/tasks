import { create } from "react-test-renderer";
import React from "react";
import { CurrentProject } from "../CurrentProject";

it("renders", () => {
  expect(
    create(
      <CurrentProject
        currentProject={{ archived: false, id: "", name: "" }}
        showProjects={() => {}}
      />
    ).toJSON()
  ).toMatchSnapshot();
});
