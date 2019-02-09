import { mount, shallow } from "enzyme";
import React from "react";

import TaskDescription from "../TaskDescription";

test("Shallow mount", () => {
  shallow(<TaskDescription onEdit={() => undefined}>foo</TaskDescription>);
});

test("Show a message when the description is empty", () => {
  const wrapper = mount(
    <TaskDescription onEdit={() => undefined}>{""}</TaskDescription>
  );

  expect(wrapper.text()).toBe("No description");
});

test("Input text", () => {
  let result: string = "";

  const wrapper = mount(
    <TaskDescription onEdit={(text: string) => (result = text)}>
      {""}
    </TaskDescription>
  );

  expect(result).toBe("");

  wrapper.simulate("click");
  wrapper.find("textarea").simulate("change", { target: { value: "foo" } });
  wrapper.find("textarea").simulate("blur");

  expect(result).toBe("foo");
});

test("Normalize invisible markdown", () => {
  let result: string = "foo";

  const wrapper = mount(
    <TaskDescription onEdit={(text: string) => (result = text)}>
      {"``"}
    </TaskDescription>
  );

  expect(result).toBe("foo");

  wrapper.setProps({});

  expect(result).toBe("");
});

test("Normalize descriptions", () => {
  let result: string = "";

  const wrapper = mount(
    <TaskDescription onEdit={(text: string) => (result = text)}>
      foo
    </TaskDescription>
  );

  expect(result).toBe("");

  wrapper.simulate("click");
  wrapper.find("textarea").simulate("change", { target: { value: "  bar " } });
  wrapper.find("textarea").simulate("blur");

  expect(result).toBe("bar");
});
