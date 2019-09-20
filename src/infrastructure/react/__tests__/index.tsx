import { ApplicationInitializer } from "../../../application/application-initializer";
import { TodoTaskCreator } from "../../../application/todo-task-creator";
import { TodoTaskUpdater } from "../../../application/todo-task-updater";
import { TodoTaskCompleter } from "../../../application/todo-task-completer";
import { DoneTaskLister } from "../../../application/done-task-lister";
import { ProjectCreator } from "../../../application/project-creator";
import { SignInManager } from "../../../application/sign-in-manager";
import { SignOutManager } from "../../../application/sign-out-manager";
import { AuthenticationStore } from "../../mobx/authentication-store";
import { ProjectsStore } from "../../mobx/projects-store";
import { TasksStore } from "../../mobx/tasks-store";
import { ReactRenderer } from "..";

it("renders", () => {
  new ReactRenderer(
    {} as ApplicationInitializer,
    {} as TodoTaskCreator,
    {} as TodoTaskUpdater,
    {} as TodoTaskCompleter,
    {} as DoneTaskLister,
    {} as ProjectCreator,
    {} as SignInManager,
    {} as SignOutManager,
    new AuthenticationStore(),
    new ProjectsStore(),
    new TasksStore(),
    ""
  ).render(document.createElement("div"));
});
