import { shallow } from "enzyme";
import * as React from "react";

import Button from "../Button";

test("Shallow mount", () => {
  shallow(<Button />);
});
