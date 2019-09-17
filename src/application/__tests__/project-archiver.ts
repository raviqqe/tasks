import { ProjectArchiver } from "../project-archiver";
import { MockManager } from "../test/mock-manager";
import { IProject } from "../../domain/project";

let mockManager: MockManager;
let projectArchiver: ProjectArchiver;

beforeEach(() => {
  mockManager = new MockManager();
  projectArchiver = new ProjectArchiver(
    mockManager.currentProjectSwitcher,
    mockManager.projectRepository,
    mockManager.projectPresenter,
    mockManager.messagePresenter
  );
});

it("archives a project", async () => {
  const projectToArchive: IProject = { archived: false, id: "0", name: "" };
  const remainingProject: IProject = { archived: false, id: "1", name: "" };

  mockManager.projectRepository.list.mockResolvedValueOnce([
    projectToArchive,
    remainingProject
  ]);
  mockManager.projectRepository.list.mockResolvedValueOnce([remainingProject]);

  await projectArchiver.archive(projectToArchive);

  expect(mockManager.projectRepository.update.mock.calls).toEqual([
    [{ ...projectToArchive, archived: true }]
  ]);
  expect(mockManager.currentProjectSwitcher.switch.mock.calls).toEqual([
    [remainingProject]
  ]);
  expect(mockManager.projectPresenter.presentProjects.mock.calls).toEqual([
    [[remainingProject]]
  ]);
});

it("does not archive any project archived already", async () => {
  await expect(
    projectArchiver.archive({ archived: true, id: "", name: "" })
  ).rejects.toThrowError();
});

it("does not archive the last project", async () => {
  const project: IProject = { archived: false, id: "", name: "" };

  mockManager.projectRepository.list.mockResolvedValueOnce([project]);

  await projectArchiver.archive(project);

  expect(mockManager.messagePresenter.present).toBeCalledTimes(1);
  expect(mockManager.currentProjectSwitcher.switch).not.toBeCalled();
  expect(mockManager.projectRepository.update).not.toBeCalled();
});
