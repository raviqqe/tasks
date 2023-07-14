import { beforeEach, expect, it } from "vitest";
import { type IProject } from "../domain/project.js";
import { ProjectArchiver } from "./project-archiver.js";
import { MockManager } from "./test/mock-manager.js";

let mockManager: MockManager;
let projectArchiver: ProjectArchiver;

beforeEach(() => {
  mockManager = new MockManager();
  mockManager.confirmationController.confirm.mockResolvedValue(true);
  projectArchiver = new ProjectArchiver(
    mockManager.currentProjectSwitcher,
    mockManager.projectRepository,
    mockManager.projectPresenter,
    mockManager.messagePresenter,
    mockManager.confirmationController,
  );
});

it("archives a project", async () => {
  const projectToArchive: IProject = { archived: false, id: "", name: "" };

  mockManager.projectRepository.list.mockResolvedValueOnce([
    projectToArchive,
    {} as IProject,
  ]);
  mockManager.projectRepository.list.mockResolvedValueOnce([{} as IProject]);

  await projectArchiver.archive(projectToArchive, "anotherProject");

  expect(mockManager.projectRepository.update.mock.calls).toEqual([
    [{ ...projectToArchive, archived: true }],
  ]);
  expect(
    mockManager.projectPresenter.presentArchivedProject.mock.calls,
  ).toEqual([[{ ...projectToArchive, archived: true }]]);
});

it("does not archive any project archived already", async () => {
  await expect(
    projectArchiver.archive({ archived: true, id: "", name: "" }, ""),
  ).rejects.toThrow();
});

it("does not archive the last project", async () => {
  const project: IProject = { archived: false, id: "", name: "" };

  mockManager.projectRepository.list.mockResolvedValueOnce([project]);

  await projectArchiver.archive(project, "");

  expect(mockManager.messagePresenter.present).toHaveBeenCalledTimes(1);
  expect(mockManager.currentProjectSwitcher.switch).not.toHaveBeenCalled();
  expect(mockManager.projectRepository.update).not.toHaveBeenCalled();
});

it("does not archive any project if it is not confirmed", async () => {
  mockManager.confirmationController.confirm.mockResolvedValue(false);
  mockManager.projectRepository.list.mockResolvedValue([{}, {}] as IProject[]);

  await projectArchiver.archive({ archived: false, id: "", name: "" }, "");

  expect(mockManager.projectRepository.update).not.toHaveBeenCalled();
});

it("switches a current project on archival", async () => {
  const projectToArchive: IProject = { archived: false, id: "", name: "" };
  const remainingProject: IProject = {
    archived: false,
    id: "anotherProject",
    name: "",
  };

  mockManager.projectRepository.list.mockResolvedValueOnce([
    projectToArchive,
    remainingProject,
  ]);
  mockManager.projectRepository.list.mockResolvedValueOnce([remainingProject]);

  await projectArchiver.archive(projectToArchive, "");

  expect(mockManager.currentProjectSwitcher.switch.mock.calls).toEqual([
    [remainingProject],
  ]);
});

it("does not switch any current projects if they are not archived", async () => {
  const projectToArchive: IProject = { archived: false, id: "", name: "" };
  const remainingProject: IProject = {
    archived: false,
    id: "anotherProject",
    name: "",
  };

  mockManager.projectRepository.list.mockResolvedValueOnce([
    projectToArchive,
    remainingProject,
  ]);
  mockManager.projectRepository.list.mockResolvedValueOnce([remainingProject]);

  await projectArchiver.archive(projectToArchive, "anotherProject");

  expect(mockManager.currentProjectSwitcher.switch).not.toHaveBeenCalled();
});
