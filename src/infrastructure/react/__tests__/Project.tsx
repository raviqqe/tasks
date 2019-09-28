import { create } from "react-test-renderer";
import React from "react";
import { Project } from "../Project";

it("renders", () => {
  expect(
    create(<Project project={{ archived: false, id: "", name: "" }} />).toJSON()
  ).toMatchSnapshot();
});
