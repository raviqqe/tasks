import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { Landing } from "./Landing";

it("renders", () => {
  expect(
    render(<Landing repositoryUrl="url" signIn={() => {}} />).container
      .firstChild
  ).toMatchSnapshot();
});
