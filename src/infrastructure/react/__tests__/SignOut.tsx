
import { create } from "react-test-renderer";
import { SignOut } from "../SignOut";

it("renders", () => {
  expect(create(<SignOut signOut={() => {}} />).toJSON()).toMatchSnapshot();
});
