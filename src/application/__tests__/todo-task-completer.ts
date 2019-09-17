import { ITask } from "../../domain/task";
import { TodoTaskCompleter } from "../todo-task-completer";
import { MockManager } from "../test/mock-manager";

const dummyTask: ITask = { id: "", name: "" };

let mockManager: MockManager;
let taskCompleter: TodoTaskCompleter;

beforeEach(() => {
  mockManager = new MockManager();
  taskCompleter = new TodoTaskCompleter(
    mockManager.todoTaskRepository,
    mockManager.doneTaskRepository,
    mockManager.todoTaskPresenter,
    mockManager.doneTaskPresenter
  );
});

it("completes and persists a task", async () => {
  await taskCompleter.complete("", dummyTask);

  expect(mockManager.todoTaskRepository.delete.mock.calls).toEqual([["", ""]]);
  expect(mockManager.todoTaskPresenter.presentDeletedTask.mock.calls).toEqual([
    [""]
  ]);
  expect(mockManager.doneTaskRepository.create.mock.calls).toEqual([
    ["", dummyTask]
  ]);
  expect(mockManager.doneTaskPresenter.presentNewTask.mock.calls).toEqual([
    [dummyTask]
  ]);
});
