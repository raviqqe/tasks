import { shallow } from "enzyme";
import React from "react";

import ModalButton from "../ModalButton";

test("Shallow mount", () => {
  shallow(
    <ModalButton buttonComponent={() => null}>{() => <div />}</ModalButton>
  );
});
