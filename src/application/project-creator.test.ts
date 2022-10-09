import { beforeEach, expect, it } from "vitest";
import { ProjectCreator } from "./project-creator";
import { MockManager } from "./test/mock-manager";

let mockManager: MockManager;
let projectCreator: ProjectCreator;

beforeEach(() => {
  mockManager = new MockManager();
  mockManager.projectRepository.list.mockResolvedValue([
    { archived: false, id: "", name: "foo" },
  ]);
  projectCreator = new ProjectCreator(
    mockManager.currentProjectSwitcher,
    mockManager.projectRepository,
    mockManager.projectPresenter,
    mockManager.messagePresenter
  );
});

it("creates and persists a project", async () => {
  await projectCreator.create("foo");

  const project = {
    archived: false,
    id: expect.any(String) as string,
    name: "foo",
  };
  expect(mockManager.projectRepository.create.mock.calls).toEqual([[project]]);
  expect(mockManager.currentProjectSwitcher.switch.mock.calls).toEqual([
    [project],
  ]);
  expect(mockManager.projectPresenter.presentProjects.mock.calls).toEqual([
    [[project]],
  ]);
});

it("formats a project before creation", async () => {
  await projectCreator.create("\tfoo ");
  expect(mockManager.projectRepository.create.mock.calls[0]?.[0].name).toBe(
    "foo"
  );
});

it("validates a project before creation", async () => {
  await projectCreator.create("");
  expect(mockManager.messagePresenter.present.mock.calls).toEqual([
    ["Project name cannot be empty!"],
  ]);
});
