import { shallow } from "enzyme";
import * as React from "react";

import Input from "../Input";

test("Shallow mount", () => {
  shallow(<Input />);
});
