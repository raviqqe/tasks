import { beforeEach, expect, it } from "vitest";
import type { Task } from "../domain/task.js";
import { MockManager } from "./test/mock-manager.js";
import { TodoTaskUpdater } from "./todo-task-updater.js";

const projectId = "project-id";
const dummyTask: Task = { id: "id", name: "foo" };

let mockManager: MockManager;
let taskUpdater: TodoTaskUpdater;

beforeEach(() => {
  mockManager = new MockManager();

  mockManager.confirmationController.confirm.mockResolvedValue(true);
  mockManager.currentProjectRepository.get.mockResolvedValue(projectId);

  taskUpdater = new TodoTaskUpdater(
    mockManager.currentProjectRepository,
    mockManager.todoTaskDeleter,
    mockManager.todoTaskRepository,
    mockManager.todoTaskPresenter,
    mockManager.confirmationController,
  );
});

it("updates and persists a task", async () => {
  await taskUpdater.update({ ...dummyTask, name: "bar" });
  expect(mockManager.todoTaskRepository.update.mock.calls).toEqual([
    [projectId, { ...dummyTask, name: "bar" }],
  ]);
  expect(mockManager.todoTaskPresenter.presentUpdatedTask.mock.calls).toEqual([
    [{ ...dummyTask, name: "bar" }],
  ]);
});

it("formats a task before update", async () => {
  await taskUpdater.update({ ...dummyTask, name: " bar" });
  expect(mockManager.todoTaskRepository.update.mock.calls).toEqual([
    [projectId, { ...dummyTask, name: "bar" }],
  ]);
});

it("deletes a task if its name is empty", async () => {
  await taskUpdater.update({ ...dummyTask, name: "" });
  expect(mockManager.todoTaskDeleter.delete.mock.calls).toEqual([["id"]]);
});

it("does not delete any tasks if it is not confirmed", async () => {
  mockManager.confirmationController.confirm.mockResolvedValue(false);
  await taskUpdater.update({ ...dummyTask, name: "" });
  expect(mockManager.todoTaskDeleter.delete).not.toHaveBeenCalled();
});
