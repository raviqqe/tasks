import { IAuthenticationController } from "../authentication-controller";
import { IAuthenticationPresenter } from "../authentication-presenter";
import { IConfirmationController } from "../confirmation-controller";
import { ICurrentProjectRepository } from "../current-project-repository";
import { CurrentProjectSwitcher } from "../current-project-switcher";
import { DoneTaskLister } from "../done-task-lister";
import { IDoneTaskPresenter } from "../done-task-presenter";
import { IDoneTaskRepository } from "../done-task-repository";
import { IMessagePresenter } from "../message-presenter";
import { ProjectCreator } from "../project-creator";
import { IProjectPresenter } from "../project-presenter";
import { IProjectRepository } from "../project-repository";
import { TodoTaskDeleter } from "../todo-task-deleter";
import { TodoTaskLister } from "../todo-task-lister";
import { ITodoTaskPresenter } from "../todo-task-presenter";
import { ITodoTaskRepository } from "../todo-task-repository";
import { Mocked, vi } from "vitest";

export class MockManager {
  public authenticationController: Mocked<IAuthenticationController> = {
    isSignedIn: vi.fn(),
    signIn: vi.fn(),
    signOut: vi.fn(),
  };

  public authenticationPresenter: Mocked<IAuthenticationPresenter> = {
    presentSignedIn: vi.fn(),
  };

  public confirmationController: Mocked<IConfirmationController> = {
    confirm: vi.fn(),
  };

  public currentProjectRepository: Mocked<ICurrentProjectRepository> = {
    get: vi.fn(),
    set: vi.fn(),
  };

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
