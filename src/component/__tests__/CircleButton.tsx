import { shallow } from "enzyme";
import * as React from "react";

import CircleButton from "../CircleButton";

test("Shallow mount", () => {
  shallow(<CircleButton onClick={() => undefined} />);
});
