import { IconButton } from "./IconButton";
import { expect, it } from "vitest";
import { render } from "@testing-library/react";

it("renders", () => {
  expect(
    render(<IconButton onClick={() => {}}>+</IconButton>).container.firstChild
  ).toMatchSnapshot();
});
