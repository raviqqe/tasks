import { beforeEach, expect, it } from "vitest";
import { IProject } from "../domain/project";
import { ProjectUpdater } from "./project-updater";
import { MockManager } from "./test/mock-manager";

const dummyProject: IProject = { archived: false, id: "", name: "foo" };

let mockManager: MockManager;
let projectUpdater: ProjectUpdater;

beforeEach(() => {
  mockManager = new MockManager();
  projectUpdater = new ProjectUpdater(
    mockManager.projectRepository,
    mockManager.projectPresenter,
    mockManager.messagePresenter
  );
});

it("updates and persists a project", async () => {
  await projectUpdater.update(dummyProject);

  expect(mockManager.projectRepository.update.mock.calls).toEqual([
    [dummyProject],
  ]);
  expect(mockManager.projectPresenter.presentUpdatedProject.mock.calls).toEqual(
    [[dummyProject]]
  );
});

it("formats a project before update", async () => {
  await projectUpdater.update({ ...dummyProject, name: " foo" });

  expect(mockManager.projectRepository.update.mock.calls).toEqual([
    [dummyProject],
  ]);
});

it("does not update any projects with empty names", async () => {
  await projectUpdater.update({ ...dummyProject, name: "" });

  expect(mockManager.messagePresenter.present).toHaveBeenCalledTimes(1);
  expect(mockManager.projectRepository.update).not.toHaveBeenCalled();
  expect(
    mockManager.projectPresenter.presentUpdatedProject
  ).not.toHaveBeenCalled();
});
