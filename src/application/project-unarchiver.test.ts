import { beforeEach, expect, it } from "vitest";
import { type IProject } from "../domain/project.js";
import { ProjectUnarchiver } from "./project-unarchiver.js";
import { MockManager } from "./test/mock-manager.js";

let mockManager: MockManager;
let projectUnarchiver: ProjectUnarchiver;

beforeEach(() => {
  mockManager = new MockManager();
  projectUnarchiver = new ProjectUnarchiver(
    mockManager.currentProjectSwitcher,
    mockManager.projectRepository,
    mockManager.projectPresenter
  );
});

it("un-archives a project", async () => {
  const projectToUnarchive: IProject = { archived: true, id: "0", name: "" };

  mockManager.projectRepository.list.mockResolvedValue([
    { ...projectToUnarchive, archived: false },
  ]);

  await projectUnarchiver.unarchive(projectToUnarchive);

  expect(mockManager.projectRepository.update.mock.calls).toEqual([
    [{ ...projectToUnarchive, archived: false }],
  ]);
  expect(mockManager.currentProjectSwitcher.switch.mock.calls).toEqual([
    [{ ...projectToUnarchive, archived: false }],
  ]);
  expect(
    mockManager.projectPresenter.presentUnarchivedProject.mock.calls
  ).toEqual([[{ ...projectToUnarchive, archived: false }]]);
});

it("does not unarchive any project not archived", async () => {
  await expect(
    projectUnarchiver.unarchive({ archived: false, id: "", name: "" })
  ).rejects.toThrow();
});
