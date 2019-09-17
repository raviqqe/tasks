import { TodoTaskReorderer } from "../todo-task-reorderer";
import { MockManager } from "../test/mock-manager";

let mockManager: MockManager;
let taskReorderer: TodoTaskReorderer;

beforeEach(() => {
  mockManager = new MockManager();
  taskReorderer = new TodoTaskReorderer(mockManager.todoTaskRepository);
});

it("creates and persists a task", async () => {
  await taskReorderer.reorder("", []);
  expect(mockManager.todoTaskRepository.reorder).toBeCalledTimes(1);
});
