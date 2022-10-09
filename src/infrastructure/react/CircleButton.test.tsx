import { CircleButton } from "./CircleButton";
import { expect, it } from "vitest";
import { render } from "@testing-library/react";

it("renders", () => {
  expect(
    render(<CircleButton>foo</CircleButton>).container.firstChild
  ).toMatchSnapshot();
});

it("renders as a secondary button", () => {
  expect(
    render(<CircleButton secondary={true}>foo</CircleButton>).container
      .firstChild
  ).toMatchSnapshot();
});
