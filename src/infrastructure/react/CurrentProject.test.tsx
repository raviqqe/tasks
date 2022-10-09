import { CurrentProject } from "./CurrentProject";
import { expect, it } from "vitest";
import { render } from "@testing-library/react";

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
