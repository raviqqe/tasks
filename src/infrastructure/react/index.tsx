import { render } from "react-dom";
import React from "react";
import { ApplicationInitializer } from "../../application/application-initializer";
import { TodoTaskCreator } from "../../application/todo-task-creator";
import { TodoTaskUpdater } from "../../application/todo-task-updater";
import { TodoTaskCompleter } from "../../application/todo-task-completer";
import { TodoTaskReorderer } from "../../application/todo-task-reorderer";
import { DoneTaskLister } from "../../application/done-task-lister";
import { ProjectCreator } from "../../application/project-creator";
import { CurrentProjectSwitcher } from "../../application/current-project-switcher";
import { ITask } from "../../domain/task";
import { SignInManager } from "../../application/sign-in-manager";
import { SignOutManager } from "../../application/sign-out-manager";
import { AuthenticationStore } from "../mobx/authentication-store";
import { ProjectsStore } from "../mobx/projects-store";
import { TasksStore } from "../mobx/tasks-store";
import { ProjectArchiver } from "../../application/project-archiver";
import { ProjectUnarchiver } from "../../application/project-unarchiver";
import { ProjectDeleter } from "../../application/project-deleter";
import { ProjectUpdater } from "../../application/project-updater";
import { GlobalStyle } from "./style";
import { App } from "./App";

export class ReactRenderer {
  constructor(
    private readonly applicationInitializer: ApplicationInitializer,
    private readonly todoTaskCreator: TodoTaskCreator,
    private readonly todoTaskUpdater: TodoTaskUpdater,
    private readonly todoTaskCompleter: TodoTaskCompleter,
    private readonly todoTaskReorderer: TodoTaskReorderer,
    private readonly doneTaskLister: DoneTaskLister,
    private readonly projectCreator: ProjectCreator,
    private readonly projectArchiver: ProjectArchiver,
    private readonly projectUnarchiver: ProjectUnarchiver,
    private readonly projectDeleter: ProjectDeleter,
    private readonly projectUpdater: ProjectUpdater,
    private readonly currentProjectSwitcher: CurrentProjectSwitcher,
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
          archiveProject={project => this.projectArchiver.archive(project)}
          authenticationStore={this.authenticationStore}
          completeTodoTask={async (task: ITask) => {
            if (this.projectsStore.currentProject) {
              await this.todoTaskCompleter.complete(
                this.projectsStore.currentProject.id,
                task
              );
            }
          }}
          createProject={(name: string) => this.projectCreator.create(name)}
          createTodoTask={async (name: string) => {
            if (this.projectsStore.currentProject) {
              await this.todoTaskCreator.create(
                this.projectsStore.currentProject.id,
                name
              );
            }
          }}
          deleteProject={project => this.projectDeleter.delete(project)}
          initialize={() => this.applicationInitializer.initialize()}
          listMoreDoneTasks={() => this.doneTaskLister.listMore()}
          projectsStore={this.projectsStore}
          reorderTodoTasks={async taskIDs => {
            if (this.projectsStore.currentProject) {
              await this.todoTaskReorderer.reorder(
                this.projectsStore.currentProject.id,
                taskIDs
              );
            }
          }}
          repositoryURL={this.repositoryURL}
          signIn={() => this.signInManager.signIn()}
          signOut={() => this.signOutManager.signOut()}
          switchCurrentProject={project =>
            this.currentProjectSwitcher.switch(project)
          }
          tasksStore={this.tasksStore}
          unarchiveProject={project =>
            this.projectUnarchiver.unarchive(project)
          }
          updateProject={project => this.projectUpdater.update(project)}
          updateTodoTask={async (task: ITask) => {
            if (this.projectsStore.currentProject) {
              await this.todoTaskUpdater.update(
                this.projectsStore.currentProject.id,
                task
              );
            }
          }}
        />
        <GlobalStyle />
      </>,
      element
    );
  }
}
