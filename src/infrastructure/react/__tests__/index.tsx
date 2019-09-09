import { ApplicationInitializer } from "../../../application/application-initializer";
import { TaskCreator } from "../../../application/task-creator";
import { TaskLister } from "../../../application/task-lister";
import { TaskUpdater } from "../../../application/task-updater";
import { SignInManager } from "../../../application/sign-in-manager";
import { SignOutManager } from "../../../application/sign-out-manager";
import { AuthenticationStore } from "../../mobx/authentication-store";
import { TasksStore } from "../../mobx/tasks-store";
import { ReactRenderer } from "..";

it("renders", () => {
  new ReactRenderer(
    {} as ApplicationInitializer,
    {} as TaskCreator,
    {} as TaskLister,
    {} as TaskUpdater,
    {} as SignInManager,
    {} as SignOutManager,
    new AuthenticationStore(),
    new TasksStore(),
    ""
  ).render(document.createElement("div"));
});
