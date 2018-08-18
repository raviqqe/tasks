import { shallow } from "enzyme";
import * as React from "react";

import MenuButton from "../MenuButton";

test("Shallow mount", () => {
  shallow(
    <MenuButton
      done={false}
      makeTaskListSortable={() => undefined}
      onTasksStateChange={() => undefined}
      pointerAvailable={true}
    />
  );
});
