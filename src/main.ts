import "@fontsource/chelsea-market";
import "@fontsource/roboto";
import { ReactRenderer } from "./infrastructure/react.js";
import { authenticationPresenter } from "./main/authentication-presenter.js";
import { doneTaskPresenter } from "./main/done-task-presenter.js";
import { errorReporter } from "./main/error-reporter.js";
import { projectPresenter } from "./main/project-presenter.js";
import { todoTaskPresenter } from "./main/todo-task-presenter.js";

try {
  const element = document.getElementById("root");

  if (!element) {
    throw new Error("no root element");
  }

  new ReactRenderer(element, [
    authenticationPresenter,
    doneTaskPresenter,
    projectPresenter,
    todoTaskPresenter,
  ]).render();
} catch (error) {
  errorReporter.report(error);
}
