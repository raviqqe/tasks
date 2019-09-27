import { OldDataMigrator } from "../old-data-migrator";
import { MockManager } from "../test/mock-manager";

let mockManager: MockManager;
let oldDataMigrator: OldDataMigrator;

beforeEach(() => {
  mockManager = new MockManager();
  oldDataMigrator = new OldDataMigrator(
    mockManager.oldProjectRepository,
    mockManager.projectRepository,
    mockManager.todoTaskRepository,
    mockManager.doneTaskRepository
  );
});

it("migrates no project", async () => {
  mockManager.oldProjectRepository.list.mockResolvedValue([]);

  await oldDataMigrator.migrate();
});

it("migrates an empty project", async () => {
  mockManager.oldProjectRepository.list.mockResolvedValue([
    { doneTasks: [], name: "", todoTasks: [] }
  ]);

  await oldDataMigrator.migrate();

  expect(mockManager.projectRepository.create).toBeCalledTimes(1);
  expect(mockManager.todoTaskRepository.create).toBeCalledTimes(0);
  expect(mockManager.doneTaskRepository.create).toBeCalledTimes(0);
});

it("migrates an archived project", async () => {
  mockManager.oldProjectRepository.list.mockResolvedValue([
    { archived: true, doneTasks: [], name: "", todoTasks: [] }
  ]);

  await oldDataMigrator.migrate();

  expect(mockManager.projectRepository.create.mock.calls).toEqual([
    [{ archived: true, id: expect.any(String), name: "" }]
  ]);
});

it("does not migrate a project migrated already", async () => {
  mockManager.oldProjectRepository.list.mockResolvedValue([
    { doneTasks: [], migrated: true, name: "", todoTasks: [] }
  ]);

  await oldDataMigrator.migrate();

  expect(mockManager.projectRepository.create).toBeCalledTimes(0);
});

it("migrates a project with a todo task", async () => {
  mockManager.oldProjectRepository.list.mockResolvedValue([
    { doneTasks: [], name: "", todoTasks: [{ id: "", name: "" }] }
  ]);

  await oldDataMigrator.migrate();

  expect(mockManager.projectRepository.create).toBeCalledTimes(1);
  expect(mockManager.todoTaskRepository.create).toBeCalledTimes(1);
  expect(mockManager.doneTaskRepository.create).toBeCalledTimes(0);
});

it("migrates a project with a done task", async () => {
  mockManager.oldProjectRepository.list.mockResolvedValue([
    { doneTasks: [{ id: "", name: "" }], name: "", todoTasks: [] }
  ]);

  await oldDataMigrator.migrate();

  expect(mockManager.projectRepository.create).toBeCalledTimes(1);
  expect(mockManager.todoTaskRepository.create).toBeCalledTimes(0);
  expect(mockManager.doneTaskRepository.create).toBeCalledTimes(1);
});

it("marks an old project as migrated", async () => {
  mockManager.oldProjectRepository.list.mockResolvedValue([
    { archived: true, doneTasks: [], name: "", todoTasks: [] }
  ]);

  await oldDataMigrator.migrate();

  expect(mockManager.oldProjectRepository.markMigrated).toBeCalledTimes(1);
});
