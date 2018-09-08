import { shallow } from "enzyme";
import React from "react";

import Button from "../Button";

test("Shallow mount", () => {
  shallow(<Button />);
});
