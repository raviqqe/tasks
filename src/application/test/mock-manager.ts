import { Mocked, vi } from "vitest";
import { IAuthenticationController } from "../authentication-controller.js";
import { IAuthenticationPresenter } from "../authentication-presenter.js";
import { IConfirmationController } from "../confirmation-controller.js";
import { CurrentProjectInitializer } from "../current-project-initializer.js";
import { ICurrentProjectRepository } from "../current-project-repository.js";
import { CurrentProjectSwitcher } from "../current-project-switcher.js";
import { DoneTaskLister } from "../done-task-lister.js";
import { IDoneTaskPresenter } from "../done-task-presenter.js";
import { IDoneTaskRepository } from "../done-task-repository.js";
import { IMessagePresenter } from "../message-presenter.js";
import { ProjectCreator } from "../project-creator.js";
import { IProjectPresenter } from "../project-presenter.js";
import { IProjectRepository } from "../project-repository.js";
import { TodoTaskDeleter } from "../todo-task-deleter.js";
import { TodoTaskLister } from "../todo-task-lister.js";
import { ITodoTaskPresenter } from "../todo-task-presenter.js";
import { ITodoTaskRepository } from "../todo-task-repository.js";

export class MockManager {
  public authenticationController: Mocked<IAuthenticationController> = {
    isSignedIn: vi.fn(async () => false),
    signIn: vi.fn(async () => {}),
    signOut: vi.fn(async () => {}),
  };

  public authenticationPresenter: Mocked<IAuthenticationPresenter> = {
    presentSignedIn: vi.fn((_: boolean) => {}),
  };

  public confirmationController: Mocked<IConfirmationController> = {
    confirm: vi.fn(),
  };

  public currentProjectRepository: Mocked<ICurrentProjectRepository> = {
    get: vi.fn(),
    set: vi.fn(),
  };

  public currentProjectInitializer: Mocked<CurrentProjectInitializer> = {
    initialize: vi.fn(),
  } as unknown as Mocked<CurrentProjectInitializer>;

  public currentProjectSwitcher: Mocked<CurrentProjectSwitcher> = {
    switch: vi.fn(),
  } as unknown as Mocked<CurrentProjectSwitcher>;

  public doneTaskRepository: Mocked<IDoneTaskRepository> = {
    create: vi.fn(),
    list: vi.fn(),
  };

  public doneTaskLister: Mocked<DoneTaskLister> = {
    list: vi.fn(),
  } as unknown as Mocked<DoneTaskLister>;

  public doneTaskPresenter: Mocked<IDoneTaskPresenter> = {
    presentMoreTasks: vi.fn(),
    presentNewTask: vi.fn(),
    presentTasks: vi.fn(),
  };

  public messagePresenter: Mocked<IMessagePresenter> = {
    present: vi.fn(),
  };

  public projectCreator: Mocked<ProjectCreator> = {
    create: vi.fn(),
  } as unknown as Mocked<ProjectCreator>;

  public projectPresenter: Mocked<IProjectPresenter> = {
    presentArchivedProject: vi.fn(),
    presentArchivedProjects: vi.fn(),
    presentCurrentProject: vi.fn(),
    presentDeletedProject: vi.fn(),
    presentProjects: vi.fn(),
    presentUnarchivedProject: vi.fn(),
    presentUpdatedProject: vi.fn(),
  };

  public projectRepository: Mocked<IProjectRepository> = {
    create: vi.fn(),
    delete: vi.fn(),
    list: vi.fn(),
    listArchived: vi.fn(),
    update: vi.fn(),
  };

  public todoTaskDeleter: Mocked<TodoTaskDeleter> = {
    delete: vi.fn(),
  } as unknown as Mocked<TodoTaskDeleter>;

  public todoTaskLister: Mocked<TodoTaskLister> = {
    list: vi.fn(),
  } as unknown as Mocked<TodoTaskLister>;

  public todoTaskRepository: Mocked<ITodoTaskRepository> = {
    create: vi.fn(),
    delete: vi.fn(),
    list: vi.fn(),
    reorder: vi.fn(),
    update: vi.fn(),
  };

  public todoTaskPresenter: Mocked<ITodoTaskPresenter> = {
    presentDeletedTask: vi.fn(),
    presentNewTask: vi.fn(),
    presentReorderedTasks: vi.fn(),
    presentTasks: vi.fn(),
    presentUpdatedTask: vi.fn(),
  };
}
