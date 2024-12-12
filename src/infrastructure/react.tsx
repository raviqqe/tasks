import { StrictMode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { type Task } from "../domain/task.js";
import { App, type Props as AppProps } from "./react/App.js";
import { globalStyle } from "./react/style.js";
import { type Renderer } from "./renderer.js";

interface Presenter {
  setRenderer(renderer: Renderer): void;
}

type Props = Pick<AppProps, "todoTasks">;

export class ReactRenderer implements Renderer {
  private readonly root: Root;
  private props: Props = { todoTasks: null };

  constructor(element: HTMLElement, presenters: Presenter[]) {
    for (const presenter of presenters) {
      presenter.setRenderer(this);
    }

    this.root = createRoot(element);
  }

  public render(): void {
    this.renderProps({});
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
