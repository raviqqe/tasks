import { IProject } from "../../domain/project";
import { ProjectUnarchiver } from "../project-unarchiver";
import { MockManager } from "../test/mock-manager";

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

it("unarchives a project", async () => {
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
