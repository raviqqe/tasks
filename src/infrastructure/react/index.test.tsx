import { it, vi } from "vitest";
import { ApplicationInitializer } from "../../application/application-initializer.js";
import { CurrentProjectInitializer } from "../../application/current-project-initializer.js";
import { CurrentProjectSwitcher } from "../../application/current-project-switcher.js";
import { DoneTaskLister } from "../../application/done-task-lister.js";
import { ProjectArchiver } from "../../application/project-archiver.js";
import { ProjectCreator } from "../../application/project-creator.js";
import { ProjectDeleter } from "../../application/project-deleter.js";
import { ProjectUnarchiver } from "../../application/project-unarchiver.js";
import { ProjectUpdater } from "../../application/project-updater.js";
import { SignInManager } from "../../application/sign-in-manager.js";
import { SignOutManager } from "../../application/sign-out-manager.js";
import { TodoTaskCompleter } from "../../application/todo-task-completer.js";
import { TodoTaskCreator } from "../../application/todo-task-creator.js";
import { TodoTaskReorderer } from "../../application/todo-task-reorderer.js";
import { TodoTaskUpdater } from "../../application/todo-task-updater.js";
import { ReactRenderer } from ".";

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
    ""
  ).render();
});
