import { mount, shallow } from "enzyme";
import React from "react";

import TaskDescription from "../TaskDescription";

test("Shallow mount", () => {
  shallow(<TaskDescription text="foo" onEdit={() => undefined} />);
});

test("Show a message when the description is empty", () => {
  const wrapper = mount(<TaskDescription onEdit={() => undefined} text="" />);

  expect(wrapper.text()).toBe("No description");
});

test("Input text", () => {
  let result: string = "";

  const wrapper = mount(
    <TaskDescription onEdit={(text: string) => (result = text)} text="" />
  );

  expect(result).toBe("");

  wrapper.simulate("click");
  wrapper.find("textarea").simulate("change", { target: { value: "foo" } });
  wrapper.find("textarea").simulate("blur");

  expect(result).toBe("foo");
});

test("Normalize invisible markdown", () => {
  let result: string = "";

  const wrapper = mount(
    <TaskDescription onEdit={(text: string) => (result = text)} text="" />
  );

  expect(result).toBe("");

  wrapper.simulate("click");
  wrapper.find("textarea").simulate("change", { target: { value: "``" } });
  wrapper.find("textarea").simulate("blur");
  wrapper.setProps({ text: result });

  expect(result).toBe("");
});

test("Normalize names", () => {
  let result: string = "";

  const wrapper = mount(
    <TaskDescription onEdit={(text: string) => (result = text)} text="foo" />
  );

  expect(result).toBe("");

  wrapper.simulate("click");
  wrapper.find("textarea").simulate("change", { target: { value: "  bar " } });
  wrapper.find("textarea").simulate("blur");

  expect(result).toBe("bar");
});
