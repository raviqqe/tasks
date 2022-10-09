import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { SignIn } from "./SignIn";

it("renders", () => {
  expect(
    render(<SignIn signIn={() => {}} />).container.firstChild
  ).toMatchSnapshot();
});
