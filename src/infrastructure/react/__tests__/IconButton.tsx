import { create } from "react-test-renderer";
import React from "react";
import { IconButton } from "../IconButton";

it("renders", () => {
  expect(
    create(<IconButton onClick={() => undefined}>+</IconButton>).toJSON()
  ).toMatchSnapshot();
});
