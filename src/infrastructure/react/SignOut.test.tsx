import { render } from "@testing-library/react";
import { it, expect } from "vitest";
import { SignOut } from "./SignOut.js";

it("renders", () => {
  expect(
    render(<SignOut signOut={() => {}} />).container.firstChild,
  ).toMatchSnapshot();
});
