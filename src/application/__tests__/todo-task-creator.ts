import { TodoTaskCreator } from "../todo-task-creator";
import { MockManager } from "../test/mock-manager";

let mockManager: MockManager;
let taskCreator: TodoTaskCreator;

beforeEach(() => {
  mockManager = new MockManager();
  taskCreator = new TodoTaskCreator(
    mockManager.todoTaskRepository,
    mockManager.todoTaskPresenter,
    mockManager.messagePresenter
  );
});

it("creates and persists a task", async () => {
  await taskCreator.create("", "foo");
  expect(mockManager.todoTaskRepository.create.mock.calls).toEqual([
    ["", { id: expect.any(String), name: "foo" }]
  ]);
  expect(mockManager.todoTaskPresenter.presentNewTask.mock.calls).toEqual([
    [{ id: expect.any(String), name: "foo" }]
  ]);
});

it("formats a task before creation", async () => {
  await taskCreator.create("", "\tfoo ");
  expect(mockManager.todoTaskRepository.create.mock.calls[0][1].name).toBe(
    "foo"
  );
});

it("validates a task before creation", async () => {
  await taskCreator.create("", "");
  expect(mockManager.messagePresenter.present.mock.calls).toEqual([
    ["Task name cannot be empty!"]
  ]);
});
