import React from "react";
import { create } from "react-test-renderer";
import { IconButton } from "../IconButton";

it("renders", () => {
  expect(
    create(<IconButton onClick={() => undefined}>+</IconButton>).toJSON()
  ).toMatchSnapshot();
});
