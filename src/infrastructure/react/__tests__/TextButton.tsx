import { create } from "react-test-renderer";
import React from "react";
import { TextButton } from "../TextButton";

it("renders", () => {
  expect(create(<TextButton>foo</TextButton>).toJSON()).toMatchSnapshot();
});

it("renders as a secondary button", () => {
  expect(
    create(<TextButton secondary={true}>foo</TextButton>).toJSON()
  ).toMatchSnapshot();
});
