import { render } from "react-dom";
import { ApplicationInitializer } from "../../application/application-initializer";
import { CurrentProjectSwitcher } from "../../application/current-project-switcher";
import { DoneTaskLister } from "../../application/done-task-lister";
import { ProjectArchiver } from "../../application/project-archiver";
import { ProjectCreator } from "../../application/project-creator";
import { ProjectDeleter } from "../../application/project-deleter";
import { ProjectUnarchiver } from "../../application/project-unarchiver";
import { ProjectUpdater } from "../../application/project-updater";
import { SignInManager } from "../../application/sign-in-manager";
import { SignOutManager } from "../../application/sign-out-manager";
import { TodoTaskCompleter } from "../../application/todo-task-completer";
import { TodoTaskCreator } from "../../application/todo-task-creator";
import { TodoTaskReorderer } from "../../application/todo-task-reorderer";
import { TodoTaskUpdater } from "../../application/todo-task-updater";
import { IProject } from "../../domain/project";
import { ITask } from "../../domain/task";
import { IRenderer } from "../renderer";
import { App, IProps as IAppProps } from "./App";
import { GlobalStyle } from "./style";

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

export class ReactRenderer {
  private props: IProps = {
    archivedProjects: null,
    currentProject: null,
    doneTasks: null,
    projects: null,
    signedIn: null,
    todoTasks: null,
  };

  constructor(
    private readonly element: HTMLElement,
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
    private readonly currentProjectSwitcher: CurrentProjectSwitcher,
    private readonly signInManager: SignInManager,
    private readonly signOutManager: SignOutManager,
    private readonly repositoryURL: string
  ) {
    for (const presenter of presenters) {
      presenter.setRenderer(this);
    }
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

    render(
      <>
        <App
          {...this.props}
          archiveProject={(project, currentProjectID) =>
            this.projectArchiver.archive(project, currentProjectID)
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
          listMoreDoneTasks={() => this.doneTaskLister.listMore()}
          reorderTodoTasks={async (taskIds) => {
            if (currentProject) {
              await this.todoTaskReorderer.reorder(currentProject.id, taskIds);
            }
          }}
          repositoryURL={this.repositoryURL}
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
      </>,
      this.element
    );
  }
}
