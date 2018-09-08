import { shallow } from "enzyme";
import React from "react";

import MenuBox from "../MenuBox";

test("Shallow mount", () => {
  shallow(
    <MenuBox
      done={false}
      makeTaskListSortable={() => undefined}
      changeTasksState={() => undefined}
      pointerAvailable={true}
    />
  );
});
