import React from "react";
import { create } from "react-test-renderer";
import { SignIn } from "../SignIn";

it("renders", () => {
  expect(create(<SignIn signIn={() => {}} />).toJSON()).toMatchSnapshot();
});
