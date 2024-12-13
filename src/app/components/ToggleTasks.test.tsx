import { expect, it } from "vitest";
import { renderRouter } from "../test.js";
import { ToggleTasks } from "./ToggleTasks.js";

it("renders", () => {
  expect(renderRouter(<ToggleTasks />).container.firstChild).toMatchSnapshot();
});
