import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { CurrentProject } from "./CurrentProject.js";

it("renders", () => {
  expect(
    render(
      <CurrentProject
        currentProject={{ archived: false, id: "", name: "" }}
        showProjects={() => {}}
      />
    ).container.firstChild
  ).toMatchSnapshot();
});
