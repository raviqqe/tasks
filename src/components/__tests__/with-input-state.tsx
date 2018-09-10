import { mount } from "enzyme";
import React, { Component } from "react";

import withInputState, { IInternalProps } from "../with-input-state";

const Input = withInputState(
  class extends Component<IInternalProps> {
    public render() {
      const { inputProps } = this.props;

      return <input {...inputProps} />;
    }
  }
);

test("Input text", () => {
  let result: string = "";

  const wrapper = mount(
    <Input onEdit={(text: string) => (result = text)} text="" />
  );

  wrapper.setState({ editing: true });
  expect(wrapper.state("editing")).toBeTruthy();

  wrapper.find("input").simulate("change", { target: { value: "foo" } });
  expect(result).toBe("");

  wrapper.find("input").simulate("blur");
  expect(wrapper.state("editing")).toBeFalsy();

  expect(result).toBe("foo");
});
