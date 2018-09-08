import { shallow } from "enzyme";
import React from "react";

import SmallIconButton from "../SmallIconButton";

test("Shallow mount", () => {
  shallow(<SmallIconButton onClick={() => undefined} />);
});
