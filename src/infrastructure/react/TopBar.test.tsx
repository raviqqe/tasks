import { TopBar } from "./TopBar";
import { it, expect } from "vitest";
import { render } from "@testing-library/react";

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
