import { TodoTaskDeleter } from "../todo-task-deleter";
import { MockManager } from "../test/mock-manager";

let mockManager: MockManager;
let taskDeleter: TodoTaskDeleter;

beforeEach(() => {
  mockManager = new MockManager();
  taskDeleter = new TodoTaskDeleter(
    mockManager.todoTaskRepository,
    mockManager.todoTaskPresenter
  );
});

it("deletes a task if its name is empty", async () => {
  await taskDeleter.delete("", "");
  expect(mockManager.todoTaskRepository.delete.mock.calls).toEqual([["", ""]]);
  expect(mockManager.todoTaskPresenter.presentDeletedTask.mock.calls).toEqual([
    [""]
  ]);
});
