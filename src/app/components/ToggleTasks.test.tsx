import { expect, it } from "vitest";
import { ToggleTasks } from "./ToggleTasks.js";
import { renderRouter } from "../test.js";

it("renders", () => {
  expect(renderRouter(<ToggleTasks />).container.firstChild).toMatchSnapshot();
});
