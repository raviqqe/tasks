import { ITask } from "../../domain/task";
import { TodoTaskLister } from "../todo-task-lister";
import { MockManager } from "../test/mock-manager";

const dummyTask: ITask = { id: "", name: "" };

let mockManager: MockManager;
let taskLister: TodoTaskLister;

beforeEach(() => {
  mockManager = new MockManager();
  taskLister = new TodoTaskLister(
    mockManager.todoTaskRepository,
    mockManager.todoTaskPresenter
  );
});

it("lists tasks", async () => {
  mockManager.todoTaskRepository.list.mockResolvedValue([dummyTask]);
  await taskLister.list("");
  expect(mockManager.todoTaskPresenter.presentTasks.mock.calls).toEqual([
    [[dummyTask]]
  ]);
});

it("lists no tasks", async () => {
  mockManager.todoTaskRepository.list.mockResolvedValue([]);
  await taskLister.list("");
  expect(mockManager.todoTaskPresenter.presentTasks.mock.calls).toEqual([[[]]]);
});
