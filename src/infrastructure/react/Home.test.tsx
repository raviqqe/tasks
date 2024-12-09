import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { Home } from "./Home.js";

it("renders", () => {
  expect(
    render(
      <Home
        currentProject={{ archived: false, id: "", name: "" }}
        doneTasks={[]}
        onShowProjects={() => {}}
        todoTasks={[]}
      />,
    ).container.firstChild,
  ).toMatchSnapshot();
});
