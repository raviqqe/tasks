import { render } from "@testing-library/react";
import { it, expect } from "vitest";
import { Project } from "./Project.js";

it("renders", () => {
  expect(
    render(<Project project={{ archived: false, id: "", name: "" }} />)
      .container.firstChild,
  ).toMatchSnapshot();
});
