import { create } from "react-test-renderer";
import { CurrentProject } from "../CurrentProject";

it("renders", () => {
  expect(
    create(
      <CurrentProject
        currentProject={{ archived: false, id: "", name: "" }}
        showProjects={() => {}}
      />
    ).toJSON()
  ).toMatchSnapshot();
});
