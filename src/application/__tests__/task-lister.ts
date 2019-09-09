import { TaskLister } from "../task-lister";
import { ITaskRepository } from "../task-repository";
import { ITaskPresenter } from "../task-presenter";
import { ITask } from "../../domain/task";

const dummyTask: ITask = { id: "", name: "" };

let taskRepository: jest.Mocked<ITaskRepository>;
let taskPresenter: jest.Mocked<ITaskPresenter>;
let taskLister: TaskLister;

beforeEach(() => {
  taskRepository = {
    create: jest.fn(),
    delete: jest.fn(),
    list: jest.fn(async function*(_: number) {
      yield [dummyTask];
      yield [dummyTask];
    }),
    update: jest.fn()
  };
  taskPresenter = ({
    presentMoreTasks: jest.fn(),
    presentTasks: jest.fn()
  } as unknown) as jest.Mocked<ITaskPresenter>;
  taskLister = new TaskLister(taskRepository, taskPresenter);
});

it("lists tasks", async () => {
  await taskLister.list();
  expect(taskPresenter.presentTasks.mock.calls).toEqual([
    [[{ id: "", name: "" }]]
  ]);
});

it("lists no tasks", async () => {
  taskRepository.list = jest.fn(async function*(_: number) {});
  await taskLister.list();
  expect(taskPresenter.presentTasks.mock.calls).toEqual([[[]]]);
});

it("lists more tasks", async () => {
  await taskLister.list();
  await taskLister.listMore();
  expect(taskPresenter.presentMoreTasks.mock.calls).toEqual([
    [[{ id: "", name: "" }]]
  ]);
});

it("lists no more tasks", async () => {
  taskRepository.list = jest.fn(async function*(_: number) {});
  await taskLister.list();
  await taskLister.listMore();
  expect(taskPresenter.presentMoreTasks).toBeCalledTimes(0);
});

it("throws an error if it tries to list more tasks before listing initial ones", async () => {
  await expect(taskLister.listMore()).rejects.toThrowError();
});
