export interface IProject {
  id: string;
  name: string;
  archived: boolean;
}

export function formatProject(project: IProject): IProject {
  return {
    ...project,
    name: project.name.trim(),
  };
}

export function validateProject(project: IProject): void {
  if (project.name.trim() !== project.name) {
    throw new Error("project name is not formatted");
  } else if (!project.name) {
    throw new Error("project name cannot be empty");
  }
}

export function sortProjects(projects: IProject[]): IProject[] {
  return projects.sort((project, anotherProject) =>
    project.name.localeCompare(anotherProject.name)
  );
}

export function getFirstProject(projects: IProject[]): IProject {
  const project = sortProjects(projects)[0];

  if (!project) {
    throw new Error("no project found");
  }

  return project;
}
