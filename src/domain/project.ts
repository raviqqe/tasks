export interface Project {
  archived: boolean;
  id: string;
  name: string;
}

export function formatProject(project: Project): Project {
  return {
    ...project,
    name: project.name.trim(),
  };
}

export function getFirstProject(projects: Project[]): Project {
  const project = sortProjects(projects)[0];

  if (!project) {
    throw new Error("no project found");
  }

  return project;
}

export function sortProjects(projects: Project[]): Project[] {
  return projects.sort((project, anotherProject) =>
    project.name.localeCompare(anotherProject.name),
  );
}

export function validateProject(project: Project): void {
  if (project.name.trim() !== project.name) {
    throw new Error("project name is not formatted");
  } else if (!project.name) {
    throw new Error("project name cannot be empty");
  }
}
