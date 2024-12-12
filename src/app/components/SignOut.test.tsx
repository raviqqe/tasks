import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { SignOut } from "./SignOut.js";

it("renders", () => {
  expect(
    render(<SignOut signOut={() => {}} />).container.firstChild,
  ).toMatchSnapshot();
});
