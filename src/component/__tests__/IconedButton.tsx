import { shallow } from "enzyme";
import * as React from "react";
import { MdAdd } from "react-icons/md";

import IconedButton from "../IconedButton";

test("Shallow mount", () => {
  shallow(<IconedButton icon={<MdAdd />} />);
});
