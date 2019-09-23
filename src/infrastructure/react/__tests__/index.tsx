import { ApplicationInitializer } from "../../../application/application-initializer";
import { TodoTaskCreator } from "../../../application/todo-task-creator";
import { TodoTaskUpdater } from "../../../application/todo-task-updater";
import { TodoTaskCompleter } from "../../../application/todo-task-completer";
import { DoneTaskLister } from "../../../application/done-task-lister";
import { ProjectCreator } from "../../../application/project-creator";
import { SignInManager } from "../../../application/sign-in-manager";
import { SignOutManager } from "../../../application/sign-out-manager";
import { TodoTaskReorderer } from "../../../application/todo-task-reorderer";
import { CurrentProjectSwitcher } from "../../../application/current-project-switcher";
import { AuthenticationStore } from "../../mobx/authentication-store";
import { ProjectsStore } from "../../mobx/projects-store";
import { TasksStore } from "../../mobx/tasks-store";
import { ProjectArchiver } from "../../../application/project-archiver";
import { ReactRenderer } from "..";

it("renders", () => {
  new ReactRenderer(
    {} as ApplicationInitializer,
    {} as TodoTaskCreator,
    {} as TodoTaskUpdater,
    {} as TodoTaskCompleter,
    {} as TodoTaskReorderer,
    {} as DoneTaskLister,
    {} as ProjectCreator,
    {} as ProjectArchiver,
    {} as CurrentProjectSwitcher,
    {} as SignInManager,
    {} as SignOutManager,
    new AuthenticationStore(),
    new ProjectsStore(),
    new TasksStore(),
    ""
  ).render(document.createElement("div"));
});
