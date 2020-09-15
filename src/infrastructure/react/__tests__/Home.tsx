import React from "react";
import { create } from "react-test-renderer";
import { Home } from "../Home";

it("renders", () => {
  expect(
    create(
      <Home
        completeTodoTask={async () => undefined}
        createTodoTask={async () => undefined}
        currentProject={{ archived: false, id: "", name: "" }}
        doneTasks={[]}
        listMoreDoneTasks={async () => undefined}
        reorderTodoTasks={async () => undefined}
        showProjects={() => undefined}
        signOut={async () => undefined}
        todoTasks={[]}
        updateTodoTask={async () => undefined}
      />
    ).toJSON()
  ).toMatchSnapshot();
});
