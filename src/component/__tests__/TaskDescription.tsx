import { shallow } from "enzyme";
import * as React from "react";

import TaskDescription from "../TaskDescription";

test("Shallow mount", () => {
  shallow(<TaskDescription text="foo" onEdit={() => undefined} />);
});
