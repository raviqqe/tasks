import { Project } from "./Project";
import { it, expect } from "vitest";
import { render } from "@testing-library/react";

it("renders", () => {
  expect(
    render(<Project project={{ archived: false, id: "", name: "" }} />)
      .container.firstChild
  ).toMatchSnapshot();
});
