import { mount, shallow } from "enzyme";
import * as React from "react";

import TaskName from "../TaskName";

test("Shallow mount", () => {
  shallow(<TaskName text="foo" onEdit={() => undefined} />);
});

test("Input text", () => {
  let result: string = "";

  const wrapper = mount(
    <TaskName onEdit={(text: string) => (result = text)} text="foo" />
  );

  expect(result).toBe("");

  wrapper.simulate("click");
  wrapper.find("input").simulate("change", { target: { value: "bar" } });
  wrapper.find("input").simulate("keyDown", { keyCode: 13 });

  expect(result).toBe("bar");
});
