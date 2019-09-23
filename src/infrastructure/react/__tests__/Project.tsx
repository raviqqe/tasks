import { create } from "react-test-renderer";
import React from "react";
import { Project } from "../Project";

it("renders", () => {
  expect(
    create(
      <Project
        currentProject={{ archived: false, id: "", name: "" }}
        showProjects={() => {}}
      />
    ).toJSON()
  ).toMatchSnapshot();
});
