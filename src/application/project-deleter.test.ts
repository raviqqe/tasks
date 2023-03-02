import { beforeEach, expect, it } from "vitest";
import { type IProject } from "../domain/project.js";
import { ProjectDeleter } from "./project-deleter.js";
import { MockManager } from "./test/mock-manager.js";

let mockManager: MockManager;
let projectDeleter: ProjectDeleter;

beforeEach(() => {
  mockManager = new MockManager();
  mockManager.confirmationController.confirm.mockResolvedValue(true);
  projectDeleter = new ProjectDeleter(
    mockManager.projectRepository,
    mockManager.projectPresenter,
    mockManager.confirmationController
  );
});

it("deletes a project", async () => {
  const project: IProject = { archived: true, id: "", name: "" };

  await projectDeleter.delete(project);

  expect(mockManager.projectRepository.delete.mock.calls).toEqual([
    [project.id],
  ]);
  expect(mockManager.projectPresenter.presentDeletedProject.mock.calls).toEqual(
    [[project.id]]
  );
});

it("does not delete any project not archived", async () => {
  await expect(
    projectDeleter.delete({ archived: false, id: "", name: "" })
  ).rejects.toThrow();
});

it("does not delete any project if it is not confirmed", async () => {
  mockManager.confirmationController.confirm.mockResolvedValue(false);

  await projectDeleter.delete({ archived: true, id: "", name: "" });

  expect(mockManager.projectRepository.update).not.toHaveBeenCalled();
});
