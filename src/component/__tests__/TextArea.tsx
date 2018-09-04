import { shallow } from "enzyme";
import * as React from "react";

import TextArea from "../TextArea";

test("Shallow mount", () => {
  shallow(<TextArea />);
});
