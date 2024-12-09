import "@fontsource/chelsea-market";
import "@fontsource/roboto";
import { ReactRenderer } from "./infrastructure/react.js";
import { authenticationPresenter } from "./main/authentication-presenter.js";
import { doneTaskPresenter } from "./main/done-task-presenter.js";
import { errorReporter } from "./main/error-reporter.js";
import { projectArchiver } from "./main/project-archiver.js";
import { projectCreator } from "./main/project-creator.js";
import { projectDeleter } from "./main/project-deleter.js";
import { projectPresenter } from "./main/project-presenter.js";
import { projectUnarchiver } from "./main/project-unarchiver.js";
import { projectUpdater } from "./main/project-updater.js";
import { todoTaskCompleter } from "./main/todo-task-completer.js";
import { todoTaskCreator } from "./main/todo-task-creator.js";
import { todoTaskPresenter } from "./main/todo-task-presenter.js";
import { todoTaskReorderer } from "./main/todo-task-reorderer.js";
import { todoTaskUpdater } from "./main/todo-task-updater.js";

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
    todoTaskCreator,
    todoTaskUpdater,
    todoTaskCompleter,
    todoTaskReorderer,
    projectCreator,
    projectArchiver,
    projectUnarchiver,
    projectDeleter,
    projectUpdater,
  ).render();
} catch (error) {
  errorReporter.report(error);
}
