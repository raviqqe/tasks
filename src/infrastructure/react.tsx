import { StrictMode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { type ProjectArchiver } from "../application/project-archiver.js";
import { type ProjectCreator } from "../application/project-creator.js";
import { type ProjectDeleter } from "../application/project-deleter.js";
import { type ProjectUnarchiver } from "../application/project-unarchiver.js";
import { type ProjectUpdater } from "../application/project-updater.js";
import { type Project } from "../domain/project.js";
import { type Task } from "../domain/task.js";
import { App, type Props as AppProps } from "./react/App.js";
import { globalStyle } from "./react/style.js";
import { type Renderer } from "./renderer.js";

interface Presenter {
  setRenderer(renderer: Renderer): void;
}

type Props = Pick<
  AppProps,
  | "archivedProjects"
  | "currentProject"
  | "doneTasks"
  | "projects"
  | "signedIn"
  | "todoTasks"
>;

export class ReactRenderer implements Renderer {
  private readonly root: Root;
  private props: Props = {
    archivedProjects: null,
    currentProject: null,
    doneTasks: null,
    projects: null,
    signedIn: null,
    todoTasks: null,
  };

  constructor(
    element: HTMLElement,
    presenters: Presenter[],
    private readonly projectCreator: ProjectCreator,
    private readonly projectArchiver: ProjectArchiver,
    private readonly projectUnarchiver: ProjectUnarchiver,
    private readonly projectDeleter: ProjectDeleter,
    private readonly projectUpdater: ProjectUpdater,
  ) {
    for (const presenter of presenters) {
      presenter.setRenderer(this);
    }

    this.root = createRoot(element);
  }

  public render(): void {
    this.renderProps({});
  }

  public renderArchivedProjects(archivedProjects: Project[] | null): void {
    this.renderProps({ archivedProjects });
  }

  public renderCurrentProject(currentProject: Project): void {
    this.renderProps({ currentProject });
  }

  public renderDoneTasks(doneTasks: Task[] | null): void {
    this.renderProps({ doneTasks });
  }

  public renderProjects(projects: Project[] | null): void {
    this.renderProps({ projects });
  }

  public renderSignedIn(signedIn: boolean): void {
    this.renderProps({ signedIn });
  }

  public renderTodoTasks(todoTasks: Task[] | null): void {
    this.renderProps({ todoTasks });
  }

  private renderProps(props: Partial<Props>): void {
    this.props = { ...this.props, ...props };

    this.root.render(
      <StrictMode>
        <style className={globalStyle} />
        <App
          {...this.props}
          archiveProject={(project, currentProjectId) =>
            this.projectArchiver.archive(project, currentProjectId)
          }
          createProject={(name: string) => this.projectCreator.create(name)}
          deleteProject={(project) => this.projectDeleter.delete(project)}
          unarchiveProject={(project) =>
            this.projectUnarchiver.unarchive(project)
          }
          updateProject={(project) => this.projectUpdater.update(project)}
        />
      </StrictMode>,
    );
  }
}
