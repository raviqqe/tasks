import { SignIn } from "./SignIn";
import { expect, it } from "vitest";
import { render } from "@testing-library/react";

it("renders", () => {
  expect(
    render(<SignIn signIn={() => {}} />).container.firstChild
  ).toMatchSnapshot();
});
