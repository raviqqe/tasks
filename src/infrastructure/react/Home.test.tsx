import { render } from "@testing-library/react";
import { it, expect } from "vitest";
import { Home } from "./Home.js";

it("renders", () => {
  expect(
    render(
      <Home
        completeTodoTask={async () => {}}
        createTodoTask={async () => {}}
        currentProject={{ archived: false, id: "", name: "" }}
        doneTasks={[]}
        initializeCurrentProject={async () => {}}
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
