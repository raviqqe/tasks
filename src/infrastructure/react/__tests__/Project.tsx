import { create } from "react-test-renderer";
import React from "react";
import { Project } from "../Project";

it("renders", () => {
  expect(
    create(
      <Project
        currentProject={{ archived: false, id: "id", name: "name" }}
        projects={[]}
      />
    ).toJSON()
  ).toMatchSnapshot();
});
