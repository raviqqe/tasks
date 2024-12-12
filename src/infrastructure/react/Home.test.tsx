import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { Home } from "./Home.js";

it("renders", () => {
  expect(
    render(<Home doneTasks={[]} onShowProjects={() => {}} todoTasks={[]} />)
      .container.firstChild,
  ).toMatchSnapshot();
});
