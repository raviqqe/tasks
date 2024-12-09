import { beforeEach, expect, it } from "vitest";
import { MockManager } from "./test/mock-manager.js";
import { TodoTaskReorderer } from "./todo-task-reorderer.js";

const projectId = "project-id";

let mockManager: MockManager;
let taskReorderer: TodoTaskReorderer;

beforeEach(() => {
  mockManager = new MockManager();

  mockManager.currentProjectRepository.get.mockResolvedValue(projectId);

  taskReorderer = new TodoTaskReorderer(
    mockManager.currentProjectRepository,
    mockManager.todoTaskRepository,
    mockManager.todoTaskPresenter,
  );
});

it("persists a task order", async () => {
  await taskReorderer.reorder([]);
  expect(mockManager.todoTaskRepository.reorder.mock.calls).toEqual([
    [projectId, []],
  ]);
});

it("presents reordered tasks", async () => {
  await taskReorderer.reorder([]);
  expect(
    mockManager.todoTaskPresenter.presentReorderedTasks.mock.calls,
  ).toEqual([[[]]]);
});
