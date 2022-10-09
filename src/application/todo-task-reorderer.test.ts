import { MockManager } from "./test/mock-manager";
import { TodoTaskReorderer } from "./todo-task-reorderer";
import { beforeEach, expect, it } from "vitest";

let mockManager: MockManager;
let taskReorderer: TodoTaskReorderer;

beforeEach(() => {
  mockManager = new MockManager();
  taskReorderer = new TodoTaskReorderer(
    mockManager.todoTaskRepository,
    mockManager.todoTaskPresenter
  );
});

it("persists a task order", async () => {
  await taskReorderer.reorder("", []);
  expect(mockManager.todoTaskRepository.reorder.mock.calls).toEqual([["", []]]);
});

it("presents reordered tasks", async () => {
  await taskReorderer.reorder("", []);
  expect(
    mockManager.todoTaskPresenter.presentReorderedTasks.mock.calls
  ).toEqual([[[]]]);
});
