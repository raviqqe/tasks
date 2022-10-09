import { fireEvent, render } from "@testing-library/react";
import { ToggleProjects } from "./ToggleProjects";
import { it, expect, vi } from "vitest";

it("renders with projects unarchived", () => {
  expect(
    render(
      <ToggleProjects projectsArchived={false} setProjectsArchived={() => {}} />
    ).container.firstChild
  ).toMatchSnapshot();
});

it("renders with projects archived", () => {
  expect(
    render(
      <ToggleProjects projectsArchived={true} setProjectsArchived={() => {}} />
    ).container.firstChild
  ).toMatchSnapshot();
});

it("toggles projects", () => {
  const setProjectsArchived = vi.fn();

  const { container } = render(
    <ToggleProjects
      projectsArchived={false}
      setProjectsArchived={setProjectsArchived}
    />
  );

  fireEvent.click(container.firstElementChild as Element);

  expect(setProjectsArchived).toHaveBeenCalledTimes(1);
});
