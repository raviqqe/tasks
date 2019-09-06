import { create } from "react-test-renderer";
import React from "react";
import { SignOut } from "../SignOut";

it("renders", () => {
  expect(
    create(<SignOut signOut={() => undefined} />).toJSON()
  ).toMatchSnapshot();
});
