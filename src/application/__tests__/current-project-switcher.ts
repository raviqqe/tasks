import { IProject } from "../../domain/project";
import { CurrentProjectSwitcher } from "../current-project-switcher";
import { MockManager } from "../test/mock-manager";

const dummyProject: IProject = { archived: false, id: "projectID", name: "" };

let mockManager: MockManager;
let currentProjectSwitcher: CurrentProjectSwitcher;

beforeEach(() => {
  mockManager = new MockManager();

  currentProjectSwitcher = new CurrentProjectSwitcher(
    mockManager.currentProjectRepository,
    mockManager.projectPresenter,
    mockManager.todoTaskLister
  );
});

it("switches a currrent project", async () => {
  await currentProjectSwitcher.switch(dummyProject);

  expect(mockManager.projectPresenter.presentCurrentProject.mock.calls).toEqual(
    [[dummyProject]]
  );
  expect(mockManager.currentProjectRepository.set.mock.calls).toEqual([
    [dummyProject.id]
  ]);
  expect(mockManager.todoTaskLister.list).toBeCalledTimes(1);
});
