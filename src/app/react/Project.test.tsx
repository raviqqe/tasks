import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { Project } from "./Project.js";

it("renders", () => {
  expect(
    render(<Project project={{ archived: false, id: "", name: "" }} />)
      .container.firstChild,
  ).toMatchSnapshot();
});
