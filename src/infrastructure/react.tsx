import { StrictMode } from "react";
import { createRoot, type Root } from "react-dom/client";
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
import { type IProject } from "../domain/project.js";
import { type ITask } from "../domain/task.js";
import { type IRenderer } from "./renderer.js";
import { App, type IProps as IAppProps } from "./react/App.js";
import { GlobalStyle } from "./react/style.js";

interface IPresenter {
  setRenderer(renderer: IRenderer): void;
}

interface IProps
  extends Pick<
    IAppProps,
    | "archivedProjects"
    | "currentProject"
    | "doneTasks"
    | "projects"
    | "signedIn"
    | "todoTasks"
  > {}

export class ReactRenderer implements IRenderer {
  private readonly root: Root;
  private props: IProps = {
    archivedProjects: null,
    currentProject: null,
    doneTasks: null,
    projects: null,
    signedIn: null,
    todoTasks: null,
  };

  constructor(
    element: HTMLElement,
    presenters: IPresenter[],
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
    private readonly currentProjectInitializer: CurrentProjectInitializer,
    private readonly currentProjectSwitcher: CurrentProjectSwitcher,
    private readonly signInManager: SignInManager,
    private readonly signOutManager: SignOutManager,
    private readonly repositoryUrl: string
  ) {
    for (const presenter of presenters) {
      presenter.setRenderer(this);
    }

    this.root = createRoot(element);
  }

  public render(): void {
    this.renderProps({});
  }

  public renderArchivedProjects(archivedProjects: IProject[] | null): void {
    this.renderProps({ archivedProjects });
  }

  public renderCurrentProject(currentProject: IProject): void {
    this.renderProps({ currentProject });
  }

  public renderDoneTasks(doneTasks: ITask[] | null): void {
    this.renderProps({ doneTasks });
  }

  public renderProjects(projects: IProject[] | null): void {
    this.renderProps({ projects });
  }

  public renderSignedIn(signedIn: boolean): void {
    this.renderProps({ signedIn });
  }

  public renderTodoTasks(todoTasks: ITask[] | null): void {
    this.renderProps({ todoTasks });
  }

  private renderProps(props: Partial<IProps>): void {
    this.props = { ...this.props, ...props };

    const { currentProject } = this.props;

    this.root.render(
      <StrictMode>
        <App
          {...this.props}
          archiveProject={(project, currentProjectId) =>
            this.projectArchiver.archive(project, currentProjectId)
          }
          completeTodoTask={async (task: ITask) => {
            if (currentProject) {
              await this.todoTaskCompleter.complete(currentProject.id, task);
            }
          }}
          createProject={(name: string) => this.projectCreator.create(name)}
          createTodoTask={async (name: string) => {
            if (currentProject) {
              await this.todoTaskCreator.create(currentProject.id, name);
            }
          }}
          deleteProject={(project) => this.projectDeleter.delete(project)}
          initialize={() => this.applicationInitializer.initialize()}
          initializeCurrentProject={() =>
            this.currentProjectInitializer.initialize()
          }
          listMoreDoneTasks={() => this.doneTaskLister.listMore()}
          reorderTodoTasks={async (taskIds) => {
            if (currentProject) {
              await this.todoTaskReorderer.reorder(currentProject.id, taskIds);
            }
          }}
          repositoryUrl={this.repositoryUrl}
          signIn={() => this.signInManager.signIn()}
          signOut={() => this.signOutManager.signOut()}
          switchCurrentProject={(project) =>
            this.currentProjectSwitcher.switch(project)
          }
          unarchiveProject={(project) =>
            this.projectUnarchiver.unarchive(project)
          }
          updateProject={(project) => this.projectUpdater.update(project)}
          updateTodoTask={async (task: ITask) => {
            if (currentProject) {
              await this.todoTaskUpdater.update(currentProject.id, task);
            }
          }}
        />
        <GlobalStyle />
      </StrictMode>
    );
  }
}
