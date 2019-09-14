import { ProjectCreator } from "../project-creator";
import { IProjectRepository } from "../project-repository";
import { IProjectPresenter } from "../project-presenter";
import { IMessagePresenter } from "../message-presenter";
import { CurrentProjectSwitcher } from "../current-project-switcher";

let currentProjectSwitcher: jest.Mocked<CurrentProjectSwitcher>;
let projectRepository: jest.Mocked<IProjectRepository>;
let projectPresenter: jest.Mocked<IProjectPresenter>;
let messagePresenter: jest.Mocked<IMessagePresenter>;
let projectCreator: ProjectCreator;

beforeEach(() => {
  currentProjectSwitcher = ({ switch: jest.fn() } as unknown) as jest.Mocked<
    CurrentProjectSwitcher
  >;
  projectRepository = {
    create: jest.fn(),
    list: jest.fn(async () => [{ id: "", name: "foo", taskIDs: [] }]),
    update: jest.fn()
  };
  projectPresenter = {
    presentCurrentProject: jest.fn(),
    presentProjects: jest.fn()
  };
  messagePresenter = { present: jest.fn() };
  projectCreator = new ProjectCreator(
    currentProjectSwitcher,
    projectRepository,
    projectPresenter,
    messagePresenter
  );
});

it("creates and persists a project", async () => {
  await projectCreator.create("foo");

  const project = { id: expect.any(String), name: "foo", taskIDs: [] };
  expect(projectRepository.create.mock.calls).toEqual([[project]]);
  expect(projectPresenter.presentCurrentProject.mock.calls).toEqual([
    [project]
  ]);
  expect(projectPresenter.presentProjects.mock.calls).toEqual([[[project]]]);
});

it("formats a project before creation", async () => {
  await projectCreator.create("\tfoo ");
  expect(projectRepository.create.mock.calls[0][0].name).toBe("foo");
});

it("validates a project before creation", async () => {
  await projectCreator.create("");
  expect(messagePresenter.present.mock.calls).toEqual([
    ["Project name cannot be empty!"]
  ]);
});
