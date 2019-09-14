import { TodoTaskLister } from "../todo-task-lister";
import { ITodoTaskRepository } from "../todo-task-repository";
import { ITodoTaskPresenter } from "../todo-task-presenter";
import { ITask } from "../../domain/task";

const dummyTask: ITask = { id: "", name: "" };

let todoTaskRepository: jest.Mocked<ITodoTaskRepository>;
let todoTaskPresenter: jest.Mocked<ITodoTaskPresenter>;
let taskLister: TodoTaskLister;

beforeEach(() => {
  todoTaskRepository = {
    create: jest.fn(),
    delete: jest.fn(),
    list: jest.fn(async (_: string) => [dummyTask]),
    update: jest.fn()
  };
  todoTaskPresenter = ({
    presentMoreTasks: jest.fn(),
    presentTasks: jest.fn()
  } as unknown) as jest.Mocked<ITodoTaskPresenter>;
  taskLister = new TodoTaskLister(todoTaskRepository, todoTaskPresenter);
});

it("lists tasks", async () => {
  await taskLister.list("");
  expect(todoTaskPresenter.presentTasks.mock.calls).toEqual([
    [[{ id: "", name: "" }]]
  ]);
});

it("lists no tasks", async () => {
  todoTaskRepository.list = jest.fn(async (_: string) => []);
  await taskLister.list("");
  expect(todoTaskPresenter.presentTasks.mock.calls).toEqual([[[]]]);
});
