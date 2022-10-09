import { SignOut } from "./SignOut";
import { it, expect } from "vitest";
import { render } from "@testing-library/react";

it("renders", () => {
  expect(
    render(<SignOut signOut={() => {}} />).container.firstChild
  ).toMatchSnapshot();
});
