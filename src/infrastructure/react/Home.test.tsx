import { render } from "@testing-library/react";
import { it, expect } from "vitest";
import { Home } from "./Home";

it("renders", () => {
  expect(
    render(
      <Home
        completeTodoTask={async () => {}}
        createTodoTask={async () => {}}
        currentProject={{ archived: false, id: "", name: "" }}
        doneTasks={[]}
        listMoreDoneTasks={async () => {}}
        reorderTodoTasks={async () => {}}
        showProjects={() => {}}
        signOut={async () => {}}
        todoTasks={[]}
        updateTodoTask={async () => {}}
      />
    ).container.firstChild
  ).toMatchSnapshot();
});
