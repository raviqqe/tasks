import { shallow } from "enzyme";
import * as React from "react";

import TaskList from "../TaskList";

test("Shallow mount", () => {
  shallow(
    <TaskList
      currentTaskId={null}
      done={false}
      isSmallWindow={false}
      tasks={[]}
      setTasks={() => undefined}
    />
  );
});
