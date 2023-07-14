import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { CircleButton } from "./CircleButton.js";

it("renders", () => {
  expect(
    render(<CircleButton>foo</CircleButton>).container.firstChild,
  ).toMatchSnapshot();
});

it("renders as a secondary button", () => {
  expect(
    render(<CircleButton secondary>foo</CircleButton>).container.firstChild,
  ).toMatchSnapshot();
});
