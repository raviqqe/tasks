import "@fontsource/chelsea-market";
import "@fontsource/roboto";
import { ReactRenderer } from "./infrastructure/react.js";
import { doneTaskPresenter } from "./main/done-task-presenter.js";
import { errorReporter } from "./main/error-reporter.js";
import { todoTaskPresenter } from "./main/todo-task-presenter.js";

try {
  const element = document.getElementById("root");

  if (!element) {
    throw new Error("no root element");
  }

  new ReactRenderer(element, [doneTaskPresenter, todoTaskPresenter]).render();
} catch (error) {
  errorReporter.report(error);
}
