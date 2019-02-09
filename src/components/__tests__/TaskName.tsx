import { mount, shallow } from "enzyme";
import React from "react";

import TaskName from "../TaskName";

test("Shallow mount", () => {
  shallow(<TaskName onEdit={() => undefined}>foo</TaskName>);
});

test("Input text", () => {
  let result: string = "";

  const wrapper = mount(
    <TaskName onEdit={(text: string) => (result = text)}>foo</TaskName>
  );

  expect(result).toBe("");

  wrapper.simulate("click");
  wrapper.find("input").simulate("change", { target: { value: "bar" } });
  wrapper.find("input").simulate("keyDown", { keyCode: 13 });

  expect(result).toBe("bar");
});

test("Normalize names", () => {
  let result: string = "";

  const wrapper = mount(
    <TaskName onEdit={(text: string) => (result = text)}>foo</TaskName>
  );

  expect(result).toBe("");

  wrapper.simulate("click");
  wrapper.find("input").simulate("change", { target: { value: "  bar " } });
  wrapper.find("input").simulate("keyDown", { keyCode: 13 });

  expect(result).toBe("bar");
});

test("Allow missing onEdit callbacks", () => {
  const wrapper = mount(<TaskName>foo</TaskName>);

  wrapper.simulate("click");
  expect(wrapper.find("input")).toHaveLength(0);
});
