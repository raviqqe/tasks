import { render } from "react-dom";
import React from "react";
import { ApplicationInitializer } from "../../application/application-initializer";
import { TodoTaskCreator } from "../../application/todo-task-creator";
import { TodoTaskLister } from "../../application/todo-task-lister";
import { TodoTaskUpdater } from "../../application/todo-task-updater";
import { ITask } from "../../domain/task";
import { SignInManager } from "../../application/sign-in-manager";
import { SignOutManager } from "../../application/sign-out-manager";
import { AuthenticationStore } from "../mobx/authentication-store";
import { ProjectsStore } from "../mobx/projects-store";
import { TasksStore } from "../mobx/tasks-store";
import { GlobalStyle } from "./style";
import { App } from "./App";

export class ReactRenderer {
  constructor(
    private readonly applicationInitializer: ApplicationInitializer,
    private readonly todoTaskCreator: TodoTaskCreator,
    private readonly todoTaskLister: TodoTaskLister,
    private readonly todoTaskUpdater: TodoTaskUpdater,
    private readonly signInManager: SignInManager,
    private readonly signOutManager: SignOutManager,
    private readonly authenticationStore: AuthenticationStore,
    private readonly projectsStore: ProjectsStore,
    private readonly tasksStore: TasksStore,
    private readonly repositoryURL: string
  ) {}

  public render(element: HTMLElement): void {
    render(
      <>
        <App
          authenticationStore={this.authenticationStore}
          projectsStore={this.projectsStore}
          tasksStore={this.todoTasksStore}
          createTodoTask={(text: string) => this.todoTaskCreator.create(text)}
          initialize={() => this.applicationInitializer.initialize()}
          listTodoTasks={() => this.todoTaskLister.list()}
          repositoryURL={this.repositoryURL}
          signIn={() => this.signInManager.signIn()}
          signOut={() => this.signOutManager.signOut()}
          updateTodoTask={(task: ITask) =>
            this.todoTaskUpdater.update(
              this.projectsStore.currentProject.id,
              task
            )
          }
        />
        <GlobalStyle />
      </>,
      element
    );
  }
}
