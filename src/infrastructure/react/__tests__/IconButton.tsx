import React from "react";
import { create } from "react-test-renderer";
import { IconButton } from "../IconButton";

it("renders", () => {
  expect(
    create(<IconButton onClick={() => {}}>+</IconButton>).toJSON()
  ).toMatchSnapshot();
});
