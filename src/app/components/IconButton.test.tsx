import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { IconButton } from "./IconButton.js";

it("renders", () => {
  expect(
    render(<IconButton onClick={() => {}}>+</IconButton>).container.firstChild,
  ).toMatchSnapshot();
});
