import { TodoTaskCreator } from "../todo-task-creator";
import { ITodoTaskRepository } from "../todo-task-repository";
import { ITodoTaskPresenter } from "../todo-task-presenter";
import { IMessagePresenter } from "../message-presenter";

let todoTaskRepository: jest.Mocked<ITodoTaskRepository>;
let todoTaskPresenter: jest.Mocked<ITodoTaskPresenter>;
let messagePresenter: jest.Mocked<IMessagePresenter>;
let taskCreator: TodoTaskCreator;

beforeEach(() => {
  todoTaskRepository = {
    create: jest.fn(),
    delete: jest.fn(),
    list: jest.fn(),
    update: jest.fn()
  };
  todoTaskPresenter = ({
    presentNewTask: jest.fn()
  } as unknown) as jest.Mocked<ITodoTaskPresenter>;
  messagePresenter = { present: jest.fn() };
  taskCreator = new TodoTaskCreator(
    todoTaskRepository,
    todoTaskPresenter,
    messagePresenter
  );
});

it("creates and persists a task", async () => {
  await taskCreator.create("", "foo");
  expect(todoTaskRepository.create.mock.calls).toEqual([
    [{ id: expect.any(String), name: "foo" }]
  ]);
  expect(todoTaskPresenter.presentNewTask.mock.calls).toEqual([
    [{ id: expect.any(String), name: "foo" }]
  ]);
});

it("formats a task before creation", async () => {
  await taskCreator.create("", "\tfoo ");
  expect(todoTaskRepository.create.mock.calls[0][1].name).toBe("foo");
});

it("validates a task before creation", async () => {
  await taskCreator.create("", "");
  expect(messagePresenter.present.mock.calls).toEqual([
    ["Task name cannot be empty!"]
  ]);
});
