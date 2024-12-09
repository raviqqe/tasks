import { it } from "vitest";
import { ReactRenderer } from "./react.js";

it("renders", () => {
  new ReactRenderer(document.createElement("div"), []).render();
});
