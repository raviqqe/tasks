import { DoneTaskLister } from "../done-task-lister";
import { IDoneTaskRepository } from "../done-task-repository";
import { IDoneTaskPresenter } from "../done-task-presenter";
import { ITask } from "../../domain/task";

const dummyTask: ITask = { id: "", name: "" };

let doneTaskRepository: jest.Mocked<IDoneTaskRepository>;
let doneTaskPresenter: jest.Mocked<IDoneTaskPresenter>;
let doneTaskLister: DoneTaskLister;

beforeEach(() => {
  doneTaskRepository = {
    create: jest.fn(),
    list: jest.fn(async function*(_: string, __: number) {
      yield [dummyTask];
      yield [dummyTask];
    })
  };
  doneTaskPresenter = ({
    presentMoreTasks: jest.fn(),
    presentTasks: jest.fn()
  } as unknown) as jest.Mocked<IDoneTaskPresenter>;
  doneTaskLister = new DoneTaskLister(doneTaskRepository, doneTaskPresenter);
});

it("lists tasks", async () => {
  await doneTaskLister.list("");
  expect(doneTaskPresenter.presentTasks.mock.calls).toEqual([
    [[{ id: "", name: "" }]]
  ]);
});

it("lists no tasks", async () => {
  doneTaskRepository.list = jest.fn(async function*(_: string, __: number) {});
  await doneTaskLister.list("");
  expect(doneTaskPresenter.presentTasks.mock.calls).toEqual([[[]]]);
});

it("lists more tasks", async () => {
  await doneTaskLister.list("");
  await doneTaskLister.listMore();
  expect(doneTaskPresenter.presentMoreTasks.mock.calls).toEqual([
    [[{ id: "", name: "" }]]
  ]);
});

it("lists no more tasks", async () => {
  doneTaskRepository.list = jest.fn(async function*(_: string, __: number) {});
  await doneTaskLister.list("");
  await doneTaskLister.listMore();
  expect(doneTaskPresenter.presentMoreTasks).toBeCalledTimes(0);
});

it("throws an error if it tries to list more tasks before listing initial ones", async () => {
  await expect(doneTaskLister.listMore()).rejects.toThrowError();
});
