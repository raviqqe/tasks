import * as taskModule from "../../domain/task";
import { TodoTaskUpdater } from "../todo-task-updater";
import { ITodoTaskRepository } from "../todo-task-repository";
import { ITodoTaskPresenter } from "../todo-task-presenter";
import { IMessagePresenter } from "../message-presenter";

const dummyTask: taskModule.ITask = { id: "id", name: "foo" };

let todoTaskRepository: jest.Mocked<ITodoTaskRepository>;
let todoTaskPresenter: jest.Mocked<ITodoTaskPresenter>;
let messagePresenter: jest.Mocked<IMessagePresenter>;
let taskUpdater: TodoTaskUpdater;

beforeEach(() => {
  todoTaskRepository = {
    create: jest.fn(),
    delete: jest.fn(),
    list: jest.fn(),
    update: jest.fn()
  };
  todoTaskPresenter = ({
    presentDeletedTask: jest.fn(),
    presentUpdatedTask: jest.fn()
  } as unknown) as jest.Mocked<ITodoTaskPresenter>;
  messagePresenter = { present: jest.fn() };
  taskUpdater = new TodoTaskUpdater(
    todoTaskRepository,
    todoTaskPresenter,
    messagePresenter
  );
});

afterEach(() => jest.restoreAllMocks());

it("updates and persists a task", async () => {
  await taskUpdater.update("", { ...dummyTask, name: "bar" });
  expect(todoTaskRepository.update.mock.calls).toEqual([
    ["", { ...dummyTask, name: "bar" }]
  ]);
  expect(todoTaskPresenter.presentUpdatedTask.mock.calls).toEqual([
    [{ ...dummyTask, name: "bar" }]
  ]);
});

it("formats a task before update", async () => {
  await taskUpdater.update("", dummyTask);
  expect(todoTaskRepository.update.mock.calls).toEqual([
    ["", { ...dummyTask, name: "foo" }]
  ]);
});

it("does not update any task if validation fails", async () => {
  jest.spyOn(taskModule, "validateTask").mockImplementation(() => {
    throw new Error("foo");
  });

  await taskUpdater.update("", dummyTask);
  expect(messagePresenter.present).toBeCalledTimes(1);
  expect(todoTaskPresenter.presentUpdatedTask).toBeCalledTimes(0);
});
