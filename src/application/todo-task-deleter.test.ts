import { beforeEach, expect, it } from "vitest";
import { MockManager } from "./test/mock-manager.js";
import { TodoTaskDeleter } from "./todo-task-deleter.js";

const projectId = "project-id";

let mockManager: MockManager;
let taskDeleter: TodoTaskDeleter;

beforeEach(() => {
  mockManager = new MockManager();

  mockManager.currentProjectRepository.get.mockResolvedValue(projectId);

  taskDeleter = new TodoTaskDeleter(
    mockManager.currentProjectRepository,
    mockManager.todoTaskRepository,
    mockManager.todoTaskPresenter,
  );
});

it("deletes a task if its name is empty", async () => {
  await taskDeleter.delete("");

  expect(mockManager.todoTaskRepository.delete.mock.calls).toEqual([
    [projectId, ""],
  ]);
  expect(mockManager.todoTaskPresenter.presentDeletedTask.mock.calls).toEqual([
    [""],
  ]);
});
