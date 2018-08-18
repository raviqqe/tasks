import { shallow } from "enzyme";
import * as React from "react";

import SubInformation from "../SubInformation";

test("Shallow mount", () => {
  shallow(<SubInformation />);
});
