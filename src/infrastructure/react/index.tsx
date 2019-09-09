import { render } from "react-dom";
import React from "react";
import { ApplicationInitializer } from "../../application/application-initializer";
import { TaskCreator } from "../../application/task-creator";
import { TaskLister } from "../../application/task-lister";
import { TaskUpdater } from "../../application/task-updater";
import { ITask } from "../../domain/task";
import { SignInManager } from "../../application/sign-in-manager";
import { SignOutManager } from "../../application/sign-out-manager";
import { AuthenticationStore } from "../mobx/authentication-store";
import { TasksStore } from "../mobx/tasks-store";
import { GlobalStyle } from "./style";
import { App } from "./App";

export class ReactRenderer {
  constructor(
    private readonly applicationInitializer: ApplicationInitializer,
    private readonly taskCreator: TaskCreator,
    private readonly taskLister: TaskLister,
    private readonly taskUpdater: TaskUpdater,
    private readonly signInManager: SignInManager,
    private readonly signOutManager: SignOutManager,
    private readonly authenticationStore: AuthenticationStore,
    private readonly tasksStore: TasksStore,
    private readonly repositoryURL: string
  ) {}

  public render(element: HTMLElement): void {
    render(
      <>
        <App
          authenticationStore={this.authenticationStore}
          tasksStore={this.tasksStore}
          createTask={(text: string) => this.taskCreator.create(text)}
          initialize={() => this.applicationInitializer.initialize()}
          listTasks={() => this.taskLister.list()}
          listMoreTasks={() => this.taskLister.listMore()}
          repositoryURL={this.repositoryURL}
          signIn={() => this.signInManager.signIn()}
          signOut={() => this.signOutManager.signOut()}
          updateTask={(task: ITask, text: string) =>
            this.taskUpdater.update(task, text)
          }
        />
        <GlobalStyle />
      </>,
      element
    );
  }
}
