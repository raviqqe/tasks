import { shallow } from "enzyme";
import * as React from "react";

import Menu from "../Menu";

test("Shallow mount", () => {
  shallow(
    <Menu
      done={false}
      windowSmall={false}
      makeTaskListSortable={() => undefined}
      changeTasksState={() => undefined}
      pointerAvailable={true}
    />
  );
});
