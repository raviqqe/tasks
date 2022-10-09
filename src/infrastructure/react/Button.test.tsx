import { render } from "@testing-library/react";
import { Button } from "./Button";
import { expect, it } from "vitest";

it("renders", () => {
  expect(render(<Button>foo</Button>).container.firstChild).toMatchSnapshot();
});

it("renders as a secondary button", () => {
  expect(
    render(<Button secondary={true}>foo</Button>).container.firstChild
  ).toMatchSnapshot();
});
