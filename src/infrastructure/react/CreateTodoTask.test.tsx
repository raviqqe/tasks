import { CreateTodoTask } from "./CreateTodoTask";
import { expect, it } from "vitest";
import { render } from "@testing-library/react";

it("renders", () => {
  expect(
    render(<CreateTodoTask createTodoTask={async () => {}} />).container
      .firstChild
  ).toMatchSnapshot();
});
