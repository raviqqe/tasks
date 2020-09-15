import React from "react";
import { create } from "react-test-renderer";
import { TopBar } from "../TopBar";

it("renders", () => {
  expect(
    create(
      <TopBar
        currentProject={{ archived: false, id: "", name: "" }}
        showProjects={() => undefined}
        signOut={() => Promise.resolve()}
      />
    ).toJSON()
  ).toMatchSnapshot();
});
