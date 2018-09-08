import { shallow } from "enzyme";
import React from "react";

import Link from "../Link";

test("Shallow mount", () => {
  shallow(<Link href="https://foo.com" />);
});
