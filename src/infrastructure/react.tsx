import { StrictMode } from "react";
import { createRoot, type Root } from "react-dom/client";
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

  constructor(element: HTMLElement, presenters: Presenter[]) {
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
        <App {...this.props} />
      </StrictMode>,
    );
  }
}
