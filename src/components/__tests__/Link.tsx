import { shallow } from "enzyme";
import * as React from "react";

import Link from "../Link";

test("Shallow mount", () => {
  shallow(<Link href="https://foo.com" />);
});
