import { fireEvent, render } from "@testing-library/react";
import { create } from "react-test-renderer";
import React from "react";
import { ToggleProjects } from "../ToggleProjects";

it("renders", () => {
  expect(
    create(
      <ToggleProjects projectsArchived={false} setProjectsArchived={() => {}} />
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
