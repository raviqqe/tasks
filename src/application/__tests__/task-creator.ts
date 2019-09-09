import { TaskCreator } from "../task-creator";
import { ITaskRepository } from "../task-repository";
import { ITaskPresenter } from "../task-presenter";
import { IMessagePresenter } from "../message-presenter";

let taskRepository: jest.Mocked<ITaskRepository>;
let taskPresenter: jest.Mocked<ITaskPresenter>;
let messagePresenter: jest.Mocked<IMessagePresenter>;
let taskCreator: TaskCreator;

beforeEach(() => {
  taskRepository = {
    create: jest.fn(),
    delete: jest.fn(),
    list: jest.fn(),
    update: jest.fn()
  };
  taskPresenter = ({
    presentNewTask: jest.fn()
  } as unknown) as jest.Mocked<ITaskPresenter>;
  messagePresenter = { present: jest.fn() };
  taskCreator = new TaskCreator(
    taskRepository,
    taskPresenter,
    messagePresenter
  );
});

it("creates and persists a task", async () => {
  await taskCreator.create("foo");
  expect(taskRepository.create.mock.calls).toEqual([
    [{ id: expect.any(String), name: "foo" }]
  ]);
  expect(taskPresenter.presentNewTask.mock.calls).toEqual([
    [{ id: expect.any(String), name: "foo" }]
  ]);
});

it("formats a task before creation", async () => {
  await taskCreator.create("\tfoo ");
  expect(taskRepository.create.mock.calls[0][0].name).toBe("foo");
});

it("validates a task before creation", async () => {
  await taskCreator.create("");
  expect(messagePresenter.present.mock.calls).toEqual([
    ["Task name cannot be empty!"]
  ]);
});
