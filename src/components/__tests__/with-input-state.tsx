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

  const element = mount(
    <Input onEdit={(text: string) => (result = text)} text="" />
  );

  element.setState({ editing: true });
  expect(element.state("editing")).toBeTruthy();

  element.find("input").simulate("change", { target: { value: "foo" } });
  expect(result).toBe("");

  element.find("input").simulate("blur");
  expect(element.state("editing")).toBeFalsy();

  expect(result).toBe("foo");
});
