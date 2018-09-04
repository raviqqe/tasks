import { shallow } from "enzyme";
import * as React from "react";

import SmallIconButton from "../SmallIconButton";

test("Shallow mount", () => {
  shallow(<SmallIconButton onClick={() => undefined} />);
});
