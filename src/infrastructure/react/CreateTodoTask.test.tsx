import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { CreateTodoTask } from "./CreateTodoTask.js";

it("renders", () => {
  expect(render(<CreateTodoTask />).container.firstChild).toMatchSnapshot();
});
