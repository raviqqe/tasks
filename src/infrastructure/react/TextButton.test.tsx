import { TextButton } from "./TextButton";
import { it, expect } from "vitest";
import { render } from "@testing-library/react";

it("renders", () => {
  expect(
    render(<TextButton>foo</TextButton>).container.firstChild
  ).toMatchSnapshot();
});

it("renders as a secondary button", () => {
  expect(
    render(<TextButton secondary={true}>foo</TextButton>).container.firstChild
  ).toMatchSnapshot();
});
