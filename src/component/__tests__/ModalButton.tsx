import { shallow } from "enzyme";
import * as React from "react";

import ModalButton from "../ModalButton";

test("Shallow mount", () => {
  shallow(<ModalButton buttonComponent={() => null}>{() => null}</ModalButton>);
});
