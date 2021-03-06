import { ReactRenderer } from "..";
import { ApplicationInitializer } from "../../../application/application-initializer";
import { CurrentProjectSwitcher } from "../../../application/current-project-switcher";
import { DoneTaskLister } from "../../../application/done-task-lister";
import { ProjectArchiver } from "../../../application/project-archiver";
import { ProjectCreator } from "../../../application/project-creator";
import { ProjectDeleter } from "../../../application/project-deleter";
import { ProjectUnarchiver } from "../../../application/project-unarchiver";
import { ProjectUpdater } from "../../../application/project-updater";
import { SignInManager } from "../../../application/sign-in-manager";
import { SignOutManager } from "../../../application/sign-out-manager";
import { TodoTaskCompleter } from "../../../application/todo-task-completer";
import { TodoTaskCreator } from "../../../application/todo-task-creator";
import { TodoTaskReorderer } from "../../../application/todo-task-reorderer";
import { TodoTaskUpdater } from "../../../application/todo-task-updater";

it("renders", () => {
  new ReactRenderer(
    document.createElement("div"),
    [],
    {} as ApplicationInitializer,
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
    {} as CurrentProjectSwitcher,
    {} as SignInManager,
    {} as SignOutManager,
    ""
  ).render();
});
