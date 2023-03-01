import { IProject } from "../domain/project.js";
import { ITask } from "../domain/task.js";

export interface IRenderer {
  renderArchivedProjects(projects: IProject[] | null): void;
  renderCurrentProject(project: IProject): void;
  renderDoneTasks(tasks: ITask[] | null): void;
  renderProjects(projects: IProject[] | null): void;
  renderSignedIn(signedIn: boolean): void;
  renderTodoTasks(tasks: ITask[] | null): void;
}
