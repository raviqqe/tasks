import { create } from "react-test-renderer";
import React from "react";
import { Landing } from "../Landing";

it("renders", () => {
  expect(
    create(<Landing repositoryURL="url" signIn={() => undefined} />).toJSON()
  ).toMatchSnapshot();
});
