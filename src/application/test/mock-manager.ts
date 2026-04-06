import { type Mocked, vi } from "vitest";
import type { AuthenticationController } from "../authentication-controller.js";
import type { AuthenticationPresenter } from "../authentication-presenter.js";
import type { ConfirmationController } from "../confirmation-controller.js";
import type { CurrentProjectInitializer } from "../current-project-initializer.js";
import type { CurrentProjectRepository } from "../current-project-repository.js";
import type { CurrentProjectSwitcher } from "../current-project-switcher.js";
import type { DoneTaskLister } from "../done-task-lister.js";
import type { DoneTaskPresenter } from "../done-task-presenter.js";
import type { DoneTaskRepository } from "../done-task-repository.js";
import type { MessagePresenter } from "../message-presenter.js";
import type { ProjectCreator } from "../project-creator.js";
import type { ProjectPresenter } from "../project-presenter.js";
import type { ProjectRepository } from "../project-repository.js";
import type { TodoTaskDeleter } from "../todo-task-deleter.js";
import type { TodoTaskLister } from "../todo-task-lister.js";
import type { TodoTaskPresenter } from "../todo-task-presenter.js";
import type { TodoTaskRepository } from "../todo-task-repository.js";

export class MockManager {
  authenticationController: Mocked<AuthenticationController> = {
    isSignedIn: vi.fn(async () => false),
    signIn: vi.fn(async () => {}),
    signOut: vi.fn(async () => {}),
  };

  authenticationPresenter: Mocked<AuthenticationPresenter> = {
    presentSignedIn: vi.fn((_: boolean) => {}),
  };

  confirmationController: Mocked<ConfirmationController> = {
    confirm: vi.fn(),
  };

  currentProjectRepository: Mocked<CurrentProjectRepository> = {
    get: vi.fn(),
    set: vi.fn(),
  };

  currentProjectInitializer: Mocked<CurrentProjectInitializer> = {
    initialize: vi.fn(),
  } as unknown as Mocked<CurrentProjectInitializer>;

  currentProjectSwitcher: Mocked<CurrentProjectSwitcher> = {
    switch: vi.fn(),
  } as unknown as Mocked<CurrentProjectSwitcher>;

  doneTaskRepository: Mocked<DoneTaskRepository> = {
    create: vi.fn(),
    list: vi.fn(),
  };

  doneTaskLister: Mocked<DoneTaskLister> = {
    list: vi.fn(),
  } as unknown as Mocked<DoneTaskLister>;

  doneTaskPresenter: Mocked<DoneTaskPresenter> = {
    presentMoreTasks: vi.fn(),
    presentNewTask: vi.fn(),
    presentTasks: vi.fn(),
  };

  messagePresenter: Mocked<MessagePresenter> = {
    present: vi.fn(),
  };

  projectCreator: Mocked<ProjectCreator> = {
    create: vi.fn(),
  } as unknown as Mocked<ProjectCreator>;

  projectPresenter: Mocked<ProjectPresenter> = {
    presentArchivedProject: vi.fn(),
    presentArchivedProjects: vi.fn(),
    presentCurrentProject: vi.fn(),
    presentDeletedProject: vi.fn(),
    presentProjects: vi.fn(),
    presentUnarchivedProject: vi.fn(),
    presentUpdatedProject: vi.fn(),
  };

  projectRepository: Mocked<ProjectRepository> = {
    create: vi.fn(),
    delete: vi.fn(),
    list: vi.fn(),
    listArchived: vi.fn(),
    update: vi.fn(),
  };

  todoTaskDeleter: Mocked<TodoTaskDeleter> = {
    delete: vi.fn(),
  } as unknown as Mocked<TodoTaskDeleter>;

  todoTaskLister: Mocked<TodoTaskLister> = {
    list: vi.fn(),
  } as unknown as Mocked<TodoTaskLister>;

  todoTaskRepository: Mocked<TodoTaskRepository> = {
    create: vi.fn(),
    delete: vi.fn(),
    list: vi.fn(),
    reorder: vi.fn(),
    update: vi.fn(),
  };

  todoTaskPresenter: Mocked<TodoTaskPresenter> = {
    presentDeletedTask: vi.fn(),
    presentNewTask: vi.fn(),
    presentReorderedTasks: vi.fn(),
    presentTasks: vi.fn(),
    presentUpdatedTask: vi.fn(),
  };
}
