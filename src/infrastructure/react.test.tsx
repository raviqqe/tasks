import { it, vi } from "vitest";
import { type ApplicationInitializer } from "../application/application-initializer.js";
import { type CurrentProjectInitializer } from "../application/current-project-initializer.js";
import { type CurrentProjectSwitcher } from "../application/current-project-switcher.js";
import { type DoneTaskLister } from "../application/done-task-lister.js";
import { type ProjectArchiver } from "../application/project-archiver.js";
import { type ProjectCreator } from "../application/project-creator.js";
import { type ProjectDeleter } from "../application/project-deleter.js";
import { type ProjectUnarchiver } from "../application/project-unarchiver.js";
import { type ProjectUpdater } from "../application/project-updater.js";
import { type SignInManager } from "../application/sign-in-manager.js";
import { type SignOutManager } from "../application/sign-out-manager.js";
import { type TodoTaskCompleter } from "../application/todo-task-completer.js";
import { type TodoTaskCreator } from "../application/todo-task-creator.js";
import { type TodoTaskReorderer } from "../application/todo-task-reorderer.js";
import { type TodoTaskUpdater } from "../application/todo-task-updater.js";
import { ReactRenderer } from "./react.js";

it("renders", () => {
  new ReactRenderer(
    document.createElement("div"),
    [],
    { initialize: vi.fn(async () => {}) } as unknown as ApplicationInitializer,
    {} as TodoTaskCreator,
    {} as TodoTaskUpdater,
    {} as TodoTaskCompleter,
    {} as TodoTaskReorderer,
    {} as DoneTaskLister,
    {} as ProjectCreator,
    {} as ProjectArchiver,
    {} as ProjectUnarchiver,
    {} as ProjectDeleter,
    {} as ProjectUpdater,
    {} as CurrentProjectInitializer,
    {} as CurrentProjectSwitcher,
    {} as SignInManager,
    {} as SignOutManager,
    "",
  ).render();
});
