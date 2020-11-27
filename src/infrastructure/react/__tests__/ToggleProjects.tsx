import { fireEvent, render } from "@testing-library/react";import { create } from "react-test-renderer";
import { ToggleProjects } from "../ToggleProjects";

it("renders with projects unarchived", () => {
  expect(
    create(
      <ToggleProjects projectsArchived={false} setProjectsArchived={() => {}} />
    ).toJSON()
  ).toMatchSnapshot();
});

it("renders with projects archived", () => {
  expect(
    create(
      <ToggleProjects projectsArchived={true} setProjectsArchived={() => {}} />
    ).toJSON()
  ).toMatchSnapshot();
});

it("toggles projects", () => {
  const setProjectsArchived = jest.fn();

  const { container } = render(
    <ToggleProjects
      projectsArchived={false}
      setProjectsArchived={setProjectsArchived}
    />
  );

  fireEvent.click(container.firstElementChild as Element);

  expect(setProjectsArchived).toBeCalledTimes(1);
});
