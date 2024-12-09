import { it } from "vitest";
import { type ProjectArchiver } from "../application/project-archiver.js";
import { type ProjectCreator } from "../application/project-creator.js";
import { type ProjectDeleter } from "../application/project-deleter.js";
import { type ProjectUnarchiver } from "../application/project-unarchiver.js";
import { type ProjectUpdater } from "../application/project-updater.js";
import { type TodoTaskCompleter } from "../application/todo-task-completer.js";
import { type TodoTaskCreator } from "../application/todo-task-creator.js";
import { type TodoTaskReorderer } from "../application/todo-task-reorderer.js";
import { type TodoTaskUpdater } from "../application/todo-task-updater.js";
import { ReactRenderer } from "./react.js";

it("renders", () => {
  new ReactRenderer(
    document.createElement("div"),
    [],
    {} as TodoTaskCreator,
    {} as TodoTaskUpdater,
    {} as TodoTaskCompleter,
    {} as TodoTaskReorderer,
    {} as ProjectCreator,
    {} as ProjectArchiver,
    {} as ProjectUnarchiver,
    {} as ProjectDeleter,
    {} as ProjectUpdater,
  ).render();
});
