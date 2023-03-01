import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { SignIn } from "./SignIn.js";

it("renders", () => {
  expect(
    render(<SignIn signIn={() => {}} />).container.firstChild
  ).toMatchSnapshot();
});
