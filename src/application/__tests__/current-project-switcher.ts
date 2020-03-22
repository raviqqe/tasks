import { IProject } from "../../domain/project";
import { CurrentProjectSwitcher } from "../current-project-switcher";
import { MockManager } from "../test/mock-manager";

const dummyProject: IProject = { archived: false, id: "projectId", name: "" };

let mockManager: MockManager;
let currentProjectSwitcher: CurrentProjectSwitcher;

beforeEach(() => {
  mockManager = new MockManager();

  currentProjectSwitcher = new CurrentProjectSwitcher(
    mockManager.currentProjectRepository,
    mockManager.projectPresenter,
    mockManager.todoTaskLister,
    mockManager.doneTaskLister,
    mockManager.todoTaskPresenter,
    mockManager.doneTaskPresenter
  );
});

it("switches a currrent project", async () => {
  await currentProjectSwitcher.switch(dummyProject);

  expect(
    mockManager.projectPresenter.presentCurrentProject.mock.calls
  ).toEqual([[dummyProject]]);
  expect(mockManager.currentProjectRepository.set.mock.calls).toEqual([
    [dummyProject.id],
  ]);
  expect(mockManager.todoTaskLister.list).toBeCalledTimes(1);
  expect(mockManager.doneTaskLister.list).toBeCalledTimes(1);
});

it("resets tasks before switching a current project", async () => {
  await currentProjectSwitcher.switch(dummyProject);

  expect(mockManager.todoTaskPresenter.presentTasks.mock.calls).toEqual([
    [null],
  ]);
  expect(mockManager.doneTaskPresenter.presentTasks.mock.calls).toEqual([
    [null],
  ]);
});
