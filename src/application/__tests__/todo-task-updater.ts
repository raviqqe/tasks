import { ITask } from "../../domain/task";
import { TodoTaskUpdater } from "../todo-task-updater";
import { MockManager } from "../test/mock-manager";

const dummyTask: ITask = { id: "id", name: "foo" };

let mockManager: MockManager;
let taskUpdater: TodoTaskUpdater;

beforeEach(() => {
  mockManager = new MockManager();
  taskUpdater = new TodoTaskUpdater(
    mockManager.todoTaskDeleter,
    mockManager.todoTaskRepository,
    mockManager.todoTaskPresenter,
    mockManager.messagePresenter
  );
});

it("updates and persists a task", async () => {
  await taskUpdater.update("", { ...dummyTask, name: "bar" });
  expect(mockManager.todoTaskRepository.update.mock.calls).toEqual([
    ["", { ...dummyTask, name: "bar" }]
  ]);
  expect(mockManager.todoTaskPresenter.presentUpdatedTask.mock.calls).toEqual([
    [{ ...dummyTask, name: "bar" }]
  ]);
});

it("formats a task before update", async () => {
  await taskUpdater.update("", { ...dummyTask, name: " bar" });
  expect(mockManager.todoTaskRepository.update.mock.calls).toEqual([
    ["", { ...dummyTask, name: "bar" }]
  ]);
});

it("deletes a task if its name is empty", async () => {
  await taskUpdater.update("", { ...dummyTask, name: "" });
  expect(mockManager.todoTaskDeleter.delete.mock.calls).toEqual([["", "id"]]);
});
