import { shallow } from "enzyme";
import React from "react";

import TextButton from "../TextButton";

test("Shallow mount", () => {
  shallow(<TextButton onClick={() => undefined} />);
});
