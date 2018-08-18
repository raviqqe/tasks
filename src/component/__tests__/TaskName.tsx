import { shallow } from "enzyme";
import * as React from "react";

import TaskName from "../TaskName";

test("Shallow mount", () => {
  shallow(<TaskName text="foo" onEdit={() => undefined} />);
});
