import { beforeEach, expect, it } from "vitest";
import type { Task } from "../domain/task.js";
import { MockManager } from "./test/mock-manager.js";
import { TodoTaskLister } from "./todo-task-lister.js";

const dummyTask: Task = { id: "", name: "" };

let mockManager: MockManager;
let taskLister: TodoTaskLister;

beforeEach(() => {
  mockManager = new MockManager();
  mockManager.currentProjectRepository.get.mockResolvedValue("id");
  taskLister = new TodoTaskLister(
    mockManager.currentProjectRepository,
    mockManager.todoTaskRepository,
    mockManager.todoTaskPresenter,
  );
});

it("lists tasks", async () => {
  mockManager.todoTaskRepository.list.mockResolvedValue([dummyTask]);
  await taskLister.list();
  expect(mockManager.todoTaskPresenter.presentTasks.mock.calls).toEqual([
    [null],
    [[dummyTask]],
  ]);
});

it("lists no tasks", async () => {
  mockManager.todoTaskRepository.list.mockResolvedValue([]);
  await taskLister.list();
  expect(mockManager.todoTaskPresenter.presentTasks.mock.calls).toEqual([
    [null],
    [[]],
  ]);
});
