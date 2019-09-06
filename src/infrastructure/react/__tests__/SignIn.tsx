import { create } from "react-test-renderer";
import React from "react";
import { SignIn } from "../SignIn";

it("renders", () => {
  expect(
    create(<SignIn signIn={() => undefined} />).toJSON()
  ).toMatchSnapshot();
});
