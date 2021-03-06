import { ITask } from "../../domain/task";
import { DoneTaskLister } from "../done-task-lister";
import { MockManager } from "../test/mock-manager";

const dummyTask: ITask = { id: "", name: "" };

let mockManager: MockManager;
let doneTaskLister: DoneTaskLister;

beforeEach(() => {
  mockManager = new MockManager();
  mockManager.doneTaskRepository.list.mockImplementation(async function* (
    _: string,
    __: number
  ) {});
  doneTaskLister = new DoneTaskLister(
    mockManager.doneTaskRepository,
    mockManager.doneTaskPresenter
  );
});

it("lists tasks", async () => {
  mockManager.doneTaskRepository.list.mockImplementation(async function* (
    _: string,
    __: number
  ) {
    yield [dummyTask];
  });

  await doneTaskLister.list("");

  expect(mockManager.doneTaskPresenter.presentTasks.mock.calls).toEqual([
    [[dummyTask]],
  ]);
});

it("lists no tasks", async () => {
  await doneTaskLister.list("");

  expect(mockManager.doneTaskPresenter.presentTasks.mock.calls).toEqual([[[]]]);
});

it("lists more tasks", async () => {
  mockManager.doneTaskRepository.list.mockImplementation(async function* (
    _: string,
    __: number
  ) {
    yield [];
    yield [dummyTask];
  });

  await doneTaskLister.list("");
  await doneTaskLister.listMore();

  expect(mockManager.doneTaskPresenter.presentMoreTasks.mock.calls).toEqual([
    [[dummyTask]],
  ]);
});

it("lists no more tasks", async () => {
  await doneTaskLister.list("");
  await doneTaskLister.listMore();

  expect(mockManager.doneTaskPresenter.presentMoreTasks).toBeCalledTimes(0);
});

it("throws an error if it tries to list more tasks before listing initial ones", async () => {
  await expect(doneTaskLister.listMore()).rejects.toThrowError();
});
