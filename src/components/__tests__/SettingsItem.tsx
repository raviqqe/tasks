import { shallow } from "enzyme";
import React from "react";

import SettingsItem from "../SettingsItem";

test("Shallow mount", () => {
  shallow(<SettingsItem label="Item" />);
});
