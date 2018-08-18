import { shallow } from "enzyme";
import * as React from "react";

import TextButton from "../TextButton";

test("Shallow mount", () => {
  shallow(<TextButton onClick={() => undefined} />);
});
