import { expect, it } from "vitest";
import { renderRouter } from "../test.js";
import { Project } from "./Project.js";

it("renders", () => {
  expect(
    renderRouter(<Project project={{ archived: false, id: "", name: "" }} />)
      .container.firstChild,
  ).toMatchSnapshot();
});
