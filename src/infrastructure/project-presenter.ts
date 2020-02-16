import { sortProjects, IProject } from "../domain/project";
import { IProjectPresenter } from "../application/project-presenter";
import { IRenderer } from "./renderer";

export class ProjectPresenter implements IProjectPresenter {
  private renderer: IRenderer | null = null;
  private currentProject: IProject | null = null;
  private projects: IProject[] | null = null;
  private archivedProjects: IProject[] | null = null;

  public setRenderer(renderer: IRenderer): void {
    this.renderer = renderer;
  }

  public presentCurrentProject(project: IProject): void {
    this.renderCurrentProject(project);
  }

  public presentProjects(projects: IProject[]): void {
    this.renderProjects(projects);
  }

  public presentArchivedProjects(projects: IProject[]): void {
    this.renderArchivedProjects(projects);
  }

  public presentArchivedProject(project: IProject): void {
    this.renderProjects(this.projects?.filter(({ id }) => id !== project.id));
    this.renderArchivedProjects(
      this.archivedProjects && [project, ...this.archivedProjects]
    );
  }

  public presentDeletedProject(projectId: string): void {
    this.renderArchivedProjects(
      this.archivedProjects?.filter(project => project.id !== projectId)
    );
  }

  public presentUnarchivedProject(project: IProject): void {
    this.renderProjects(this.projects && [project, ...this.projects]);
    this.renderArchivedProjects(
      this.archivedProjects?.filter(({ id }) => id !== project.id)
    );
  }

  public presentUpdatedProject(updatedProject: IProject): void {
    if (this.currentProject?.id === updatedProject.id) {
      this.renderCurrentProject(updatedProject);
    }

    this.renderProjects(
      this.projects?.map(project =>
        project.id === updatedProject.id ? updatedProject : project
      )
    );
  }

  private renderCurrentProject(project: IProject): void {
    this.currentProject = project;

    this.renderer?.renderCurrentProject(this.currentProject);
  }

  private renderProjects(projects: IProject[] | null | undefined): void {
    this.projects = projects ? sortProjects(projects) : null;

    this.renderer?.renderProjects(this.projects);
  }

  private renderArchivedProjects(
    projects: IProject[] | null | undefined
  ): void {
    this.archivedProjects = projects ? sortProjects(projects) : null;

    this.renderer?.renderArchivedProjects(this.archivedProjects);
  }
}
