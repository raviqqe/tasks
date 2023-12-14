import { type ProjectPresenter } from "../application/project-presenter.js";
import { sortProjects, type Project } from "../domain/project.js";
import { type Renderer } from "./renderer.js";

export class ProjectPresenter implements ProjectPresenter {
  private renderer: Renderer | null = null;
  private currentProject: Project | null = null;
  private projects: Project[] | null = null;
  private archivedProjects: Project[] | null = null;

  public setRenderer(renderer: Renderer): void {
    this.renderer = renderer;
  }

  public presentCurrentProject(project: Project): void {
    this.renderCurrentProject(project);
  }

  public presentProjects(projects: Project[]): void {
    this.renderProjects(projects);
  }

  public presentArchivedProjects(projects: Project[]): void {
    this.renderArchivedProjects(projects);
  }

  public presentArchivedProject(project: Project): void {
    this.renderProjects(this.projects?.filter(({ id }) => id !== project.id));
    this.renderArchivedProjects(
      this.archivedProjects && [project, ...this.archivedProjects],
    );
  }

  public presentDeletedProject(projectId: string): void {
    this.renderArchivedProjects(
      this.archivedProjects?.filter((project) => project.id !== projectId),
    );
  }

  public presentUnarchivedProject(project: Project): void {
    this.renderProjects(this.projects && [project, ...this.projects]);
    this.renderArchivedProjects(
      this.archivedProjects?.filter(({ id }) => id !== project.id),
    );
  }

  public presentUpdatedProject(updatedProject: Project): void {
    if (this.currentProject?.id === updatedProject.id) {
      this.renderCurrentProject(updatedProject);
    }

    this.renderProjects(
      this.projects?.map((project) =>
        project.id === updatedProject.id ? updatedProject : project,
      ),
    );
  }

  private renderCurrentProject(project: Project): void {
    this.currentProject = project;

    this.renderer?.renderCurrentProject(this.currentProject);
  }

  private renderProjects(projects: Project[] | null | undefined): void {
    this.projects = projects ? sortProjects(projects) : null;

    this.renderer?.renderProjects(this.projects);
  }

  private renderArchivedProjects(
    projects: Project[] | null | undefined,
  ): void {
    this.archivedProjects = projects ? sortProjects(projects) : null;

    this.renderer?.renderArchivedProjects(this.archivedProjects);
  }
}
