import { render } from "@testing-library/react";
import { it, expect } from "vitest";
import { TopBar } from "./TopBar";

it("renders", () => {
  expect(
    render(
      <TopBar
        currentProject={{ archived: false, id: "", name: "" }}
        showProjects={() => {}}
        signOut={async () => {}}
      />
    ).container.firstChild
  ).toMatchSnapshot();
});
