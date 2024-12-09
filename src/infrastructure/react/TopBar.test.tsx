import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { TopBar } from "./TopBar.js";

it("renders", () => {
  expect(
    render(
      <TopBar
        currentProject={{ archived: false, id: "", name: "" }}
        showProjects={() => {}}
      />,
    ).container.firstChild,
  ).toMatchSnapshot();
});
