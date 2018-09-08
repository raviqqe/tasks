import { mount, shallow } from "enzyme";
import React, { ChangeEvent } from "react";

import TextArea from "../TextArea";

test("Shallow mount", () => {
  shallow(<TextArea />);
});

test("Input text", () => {
  let result: string = "";

  const wrapper = mount(
    <TextArea
      onChange={({ target: { value } }: ChangeEvent<HTMLTextAreaElement>) =>
        (result = value)
      }
      value=""
    />
  );

  expect(result).toBe("");

  wrapper.simulate("change", { target: { value: "foo" } });

  expect(result).toBe("foo");
});
