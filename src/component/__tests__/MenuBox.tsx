import { shallow } from "enzyme";
import * as React from "react";

import MenuBox from "../MenuBox";

test("Shallow mount", () => {
  shallow(
    <MenuBox
      done={false}
      makeTaskListSortable={() => undefined}
      onTasksStateChange={() => undefined}
      pointerAvailable={true}
    />
  );
});
