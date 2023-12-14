import { type Project } from "../domain/project.js";
import { type Task } from "../domain/task.js";

export interface Renderer {
  renderArchivedProjects(projects: Project[] | null): void;
  renderCurrentProject(project: Project): void;
  renderDoneTasks(tasks: Task[] | null): void;
  renderProjects(projects: Project[] | null): void;
  renderSignedIn(signedIn: boolean): void;
  renderTodoTasks(tasks: Task[] | null): void;
}
