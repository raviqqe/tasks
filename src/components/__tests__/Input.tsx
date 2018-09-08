import { mount, shallow } from "enzyme";
import React, { ChangeEvent } from "react";

import Input from "../Input";

test("Shallow mount", () => {
  shallow(<Input />);
});

test("Input text", () => {
  let result: string = "";

  const wrapper = mount(
    <Input
      onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
        (result = value)
      }
      value=""
    />
  );

  expect(result).toBe("");

  wrapper.simulate("change", { target: { value: "foo" } });

  expect(result).toBe("foo");
});

test("Normalize text", () => {
  let result: string = "";

  const wrapper = mount(
    <Input
      onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
        (result = value)
      }
      value=""
    />
  );

  expect(result).toBe("");

  wrapper.simulate("change", { target: { value: "  bar " } });

  expect(result).toBe("bar");
});
