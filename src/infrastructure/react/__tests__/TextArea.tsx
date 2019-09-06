import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { TextArea } from "../TextArea";

it("renders", () => {
  expect(
    render(<TextArea onSubmit={() => undefined} />).container
  ).toMatchSnapshot();
});

it("triggers a submit callback on Enter+Shift", () => {
  const onSubmit = jest.fn();
  const { container } = render(<TextArea onSubmit={onSubmit} />);

  fireEvent.keyDown(container.firstElementChild as Element, {
    keyCode: 13,
    shiftKey: true
  });

  expect(onSubmit.mock.calls).toHaveLength(1);
});

it("does not trigger a submit callback on Enter", () => {
  const onSubmit = jest.fn();
  const { container } = render(<TextArea onSubmit={onSubmit} />);

  fireEvent.keyDown(container.firstElementChild as Element, { keyCode: 13 });

  expect(onSubmit.mock.calls).toHaveLength(0);
});
