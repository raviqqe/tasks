import { DoneTaskLister } from "../done-task-lister";
import { MockManager } from "../test/mock-manager";

let mockManager: MockManager;
let doneTaskLister: DoneTaskLister;

beforeEach(() => {
  mockManager = new MockManager();
  doneTaskLister = new DoneTaskLister(
    mockManager.doneTaskRepository,
    mockManager.doneTaskPresenter
  );
});

it("lists tasks", async () => {
  await doneTaskLister.list("");
  expect(mockManager.doneTaskPresenter.presentTasks).toBeCalledTimes(1);
});
