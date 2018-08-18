import { shallow } from "enzyme";
import * as React from "react";

import Menu from "../Menu";

test("Shallow mount", () => {
  shallow(
    <Menu
      done={false}
      isSmallWindow={false}
      makeTaskListSortable={() => undefined}
      onTasksStateChange={() => undefined}
      pointerAvailable={true}
    />
  );
});
