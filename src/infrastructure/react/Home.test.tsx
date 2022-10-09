import { Home } from "./Home";
import { it, expect } from "vitest";
import { render } from "@testing-library/react";

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
