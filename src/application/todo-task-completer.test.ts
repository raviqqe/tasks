import { beforeEach, expect, it } from "vitest";
import { type ITask } from "../domain/task.js";
import { MockManager } from "./test/mock-manager.js";
import { TodoTaskCompleter } from "./todo-task-completer.js";

const dummyTask: ITask = { id: "", name: "" };

let mockManager: MockManager;
let taskCompleter: TodoTaskCompleter;

beforeEach(() => {
  mockManager = new MockManager();
  taskCompleter = new TodoTaskCompleter(
    mockManager.todoTaskDeleter,
    mockManager.doneTaskRepository,
    mockManager.doneTaskPresenter
  );
});

it("completes and persists a task", async () => {
  await taskCompleter.complete("", dummyTask);

  expect(mockManager.todoTaskDeleter.delete.mock.calls).toEqual([["", ""]]);
  expect(mockManager.doneTaskRepository.create.mock.calls).toEqual([
    ["", dummyTask],
  ]);
  expect(mockManager.doneTaskPresenter.presentNewTask.mock.calls).toEqual([
    [dummyTask],
  ]);
});
