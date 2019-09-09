import * as taskModule from "../../domain/task";
import { TaskDeleter } from "../task-deleter";
import { TaskUpdater } from "../task-updater";
import { ITaskRepository } from "../task-repository";
import { ITaskPresenter } from "../task-presenter";
import { IMessagePresenter } from "../message-presenter";

const dummyTask: taskModule.ITask = { id: "id", name: "name" };

let taskRepository: jest.Mocked<ITaskRepository>;
let taskPresenter: jest.Mocked<ITaskPresenter>;
let messagePresenter: jest.Mocked<IMessagePresenter>;
let taskUpdater: TaskUpdater;

beforeEach(() => {
  taskRepository = {
    create: jest.fn(),
    delete: jest.fn(),
    list: jest.fn(),
    update: jest.fn()
  };
  taskPresenter = ({
    presentDeletedTask: jest.fn(),
    presentUpdatedTask: jest.fn()
  } as unknown) as jest.Mocked<ITaskPresenter>;
  messagePresenter = { present: jest.fn() };
  taskUpdater = new TaskUpdater(
    new TaskDeleter(taskRepository, taskPresenter, {
      confirm: jest.fn(async () => true)
    }),
    taskRepository,
    taskPresenter,
    messagePresenter
  );
});

afterEach(() => jest.restoreAllMocks());

it("updates and persists a task", async () => {
  await taskUpdater.update(dummyTask, "bar");
  expect(taskRepository.update.mock.calls).toEqual([
    [{ ...dummyTask, name: "bar" }]
  ]);
  expect(taskPresenter.presentUpdatedTask.mock.calls).toEqual([
    [{ ...dummyTask, name: "bar" }]
  ]);
});

it("formats a task before update", async () => {
  await taskUpdater.update(dummyTask, "\tfoo ");
  expect(taskRepository.update.mock.calls).toEqual([
    [{ ...dummyTask, name: "foo" }]
  ]);
});

it("deletes a task if its name is empty", async () => {
  await taskUpdater.update(dummyTask, "");
  expect(taskRepository.delete).toBeCalledTimes(1);
});

it("does not update any task if validation fails", async () => {
  jest.spyOn(taskModule, "validateTask").mockImplementation(() => {
    throw new Error("foo");
  });

  await taskUpdater.update(dummyTask, "bar");
  expect(messagePresenter.present).toBeCalledTimes(1);
  expect(taskPresenter.presentUpdatedTask).toBeCalledTimes(0);
});
