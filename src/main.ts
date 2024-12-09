import "@fontsource/chelsea-market";
import "@fontsource/roboto";
import { ApplicationInitializer } from "./application/application-initializer.js";
import { CurrentProjectInitializer } from "./application/current-project-initializer.js";
import { ProjectArchiver } from "./application/project-archiver.js";
import { ProjectDeleter } from "./application/project-deleter.js";
import { ProjectUnarchiver } from "./application/project-unarchiver.js";
import { ProjectUpdater } from "./application/project-updater.js";
import { TodoTaskCompleter } from "./application/todo-task-completer.js";
import { TodoTaskCreator } from "./application/todo-task-creator.js";
import { TodoTaskReorderer } from "./application/todo-task-reorderer.js";
import { TodoTaskUpdater } from "./application/todo-task-updater.js";
import configuration from "./configuration.json" with { type: "json" };
import { ReactRenderer } from "./infrastructure/react.js";
import { authenticationController } from "./main/authentication-controller.js";
import { authenticationPresenter } from "./main/authentication-presenter.js";
import { confirmationController } from "./main/confirmation-controller.js";
import { currentProjectRepository } from "./main/current-project-repository.js";
import { currentProjectSwitcher } from "./main/current-project-switcher.js";
import { doneTaskLister } from "./main/done-task-lister.js";
import { doneTaskPresenter } from "./main/done-task-presenter.js";
import { doneTaskRepository } from "./main/done-task-repository.js";
import { errorReporter } from "./main/error-reporter.js";
import { messagePresenter } from "./main/messange-presenter.js";
import { projectCreator } from "./main/project-creator.js";
import { projectPresenter } from "./main/project-presenter.js";
import { projectRepository } from "./main/project-repository.js";
import { signInManager } from "./main/sign-in-manager.js";
import { signOutManager } from "./main/sign-out-manager.js";
import { todoTaskDeleter } from "./main/todo-task-deleter.js";
import { todoTaskPresenter } from "./main/todo-task-presenter.js";
import { todoTaskRepository } from "./main/todo-task-repository.js";

try {
  const element = document.getElementById("root");

  if (!element) {
    throw new Error("no root element");
  }

  new ReactRenderer(
    element,
    [
      authenticationPresenter,
      doneTaskPresenter,
      projectPresenter,
      todoTaskPresenter,
    ],
    new ApplicationInitializer(
      authenticationController,
      authenticationPresenter,
    ),
    new TodoTaskCreator(
      todoTaskRepository,
      todoTaskPresenter,
      messagePresenter,
    ),
    new TodoTaskUpdater(
      todoTaskDeleter,
      todoTaskRepository,
      todoTaskPresenter,
      confirmationController,
    ),
    new TodoTaskCompleter(
      todoTaskDeleter,
      doneTaskRepository,
      doneTaskPresenter,
    ),
    new TodoTaskReorderer(todoTaskRepository, todoTaskPresenter),
    doneTaskLister,
    projectCreator,
    new ProjectArchiver(
      currentProjectSwitcher,
      projectRepository,
      projectPresenter,
      messagePresenter,
      confirmationController,
    ),
    new ProjectUnarchiver(
      currentProjectSwitcher,
      projectRepository,
      projectPresenter,
    ),
    new ProjectDeleter(
      projectRepository,
      projectPresenter,
      confirmationController,
    ),
    new ProjectUpdater(projectRepository, projectPresenter, messagePresenter),
    new CurrentProjectInitializer(
      projectCreator,
      projectRepository,
      projectPresenter,
      currentProjectSwitcher,
      currentProjectRepository,
    ),
    currentProjectSwitcher,
    signInManager,
    signOutManager,
    configuration.repositoryUrl,
  ).render();
} catch (error) {
  errorReporter.report(error);
}
