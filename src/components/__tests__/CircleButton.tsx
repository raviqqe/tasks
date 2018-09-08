import { shallow } from "enzyme";
import React from "react";

import CircleButton from "../CircleButton";

test("Shallow mount", () => {
  shallow(<CircleButton onClick={() => undefined} />);
});
