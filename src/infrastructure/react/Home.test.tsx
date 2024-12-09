import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { Home } from "./Home.js";

it("renders", () => {
  expect(
    render(
      <Home
        completeTodoTask={async () => {}}
        createTodoTask={async () => {}}
        currentProject={{ archived: false, id: "", name: "" }}
        doneTasks={[]}
        onShowProjects={() => {}}
        reorderTodoTasks={async () => {}}
        todoTasks={[]}
        updateTodoTask={async () => {}}
      />,
    ).container.firstChild,
  ).toMatchSnapshot();
});
