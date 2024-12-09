import { beforeEach, expect, it } from "vitest";
import { MockManager } from "./test/mock-manager.js";
import { TodoTaskCreator } from "./todo-task-creator.js";

const projectId = "project-id";

let mockManager: MockManager;
let taskCreator: TodoTaskCreator;

beforeEach(() => {
  mockManager = new MockManager();

  mockManager.currentProjectRepository.get.mockResolvedValue(projectId);

  taskCreator = new TodoTaskCreator(
    mockManager.currentProjectRepository,
    mockManager.todoTaskRepository,
    mockManager.todoTaskPresenter,
    mockManager.messagePresenter,
  );
});

it("creates and persists a task", async () => {
  await taskCreator.create("foo");
  expect(mockManager.todoTaskRepository.create.mock.calls).toEqual([
    [projectId, { id: expect.any(String) as string, name: "foo" }],
  ]);
  expect(mockManager.todoTaskPresenter.presentNewTask.mock.calls).toEqual([
    [{ id: expect.any(String) as string, name: "foo" }],
  ]);
});

it("formats a task before creation", async () => {
  await taskCreator.create("\tfoo ");
  expect(mockManager.todoTaskRepository.create.mock.calls[0]?.[1].name).toBe(
    "foo",
  );
});

it("validates a task before creation", async () => {
  await taskCreator.create("");
  expect(mockManager.messagePresenter.present.mock.calls).toEqual([
    ["Task name cannot be empty!"],
  ]);
  expect(mockManager.todoTaskRepository.create).not.toHaveBeenCalled();
  expect(mockManager.todoTaskPresenter.presentNewTask).not.toHaveBeenCalled();
});
