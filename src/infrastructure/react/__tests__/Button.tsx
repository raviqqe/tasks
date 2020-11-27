
import { create } from "react-test-renderer";
import { Button } from "../Button";

it("renders", () => {
  expect(create(<Button>foo</Button>).toJSON()).toMatchSnapshot();
});

it("renders as a secondary button", () => {
  expect(
    create(<Button secondary={true}>foo</Button>).toJSON()
  ).toMatchSnapshot();
});
