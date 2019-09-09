import { TaskDeleter } from "../task-deleter";
import { ITaskRepository } from "../task-repository";
import { ITaskPresenter } from "../task-presenter";
import { IConfirmationController } from "../confirmation-controller";

let taskRepository: jest.Mocked<ITaskRepository>;
let taskPresenter: jest.Mocked<ITaskPresenter>;
let confirmationController: jest.Mocked<IConfirmationController>;
let taskDeleter: TaskDeleter;

beforeEach(() => {
  taskRepository = {
    create: jest.fn(),
    delete: jest.fn(),
    list: jest.fn(),
    update: jest.fn()
  };
  taskPresenter = ({
    presentDeletedTask: jest.fn()
  } as unknown) as jest.Mocked<ITaskPresenter>;
  confirmationController = { confirm: jest.fn() };
  taskDeleter = new TaskDeleter(
    taskRepository,
    taskPresenter,
    confirmationController
  );
});

it("deletes a task after confirmation", async () => {
  confirmationController.confirm.mockResolvedValue(true);
  await taskDeleter.delete("foo");
  expect(taskRepository.delete.mock.calls).toEqual([["foo"]]);
  expect(taskPresenter.presentDeletedTask.mock.calls).toEqual([["foo"]]);
});

it("does not delete any task if it is not confirmed", async () => {
  confirmationController.confirm.mockResolvedValue(false);
  await taskDeleter.delete("foo");
  expect(taskRepository.delete).toBeCalledTimes(0);
  expect(taskPresenter.presentDeletedTask).toBeCalledTimes(0);
});
