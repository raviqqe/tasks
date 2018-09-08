import { shallow } from "enzyme";
import React from "react";

import SubInformation from "../SubInformation";

test("Shallow mount", () => {
  shallow(<SubInformation />);
});
