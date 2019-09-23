import React, { useState } from "react";
import styled from "styled-components";
import { IProject } from "../../domain/project";
import { CreateProject, IProps as ICreateProjectProps } from "./CreateProject";
import { HideProjects, IProps as IHideProjectsProps } from "./HideProjects";
import { Project, IProps as IProjectProps } from "./Project";
import { boxShadow } from "./style";
import { ToggleProjects } from "./ToggleProjects";

const Container = styled.div`
  background-color: lightgrey;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ScrollContainer = styled.div`
  overflow: auto;
`;

const ProjectsContainer = styled.div`
  ${boxShadow}
  display: flex;
  flex-direction: column;
  margin: 1.5rem;
  max-width: 50ex;
  background-color: white;
  border-radius: 0.5rem;
  padding: 1rem 1.5rem;

  > :not(:first-child) {
    margin-top: 0.75rem;
  }
`;

const UpperButtonsContainer = styled.div`
  position: fixed;
  right: 0.5rem;
  top: 0.5rem;
`;

const LowerButtonsContainer = styled.div`
  position: fixed;
  right: 0.5rem;
  bottom: 0.5rem;

  > * {
    margin-top: 0.5rem;
  }
`;

export interface IProps
  extends ICreateProjectProps,
    IHideProjectsProps,
    Omit<
      IProjectProps,
      | "archiveProject"
      | "currentProject"
      | "project"
      | "switchCurrentProject"
      | "unarchiveProject"
    >,
    Required<
      Pick<
        IProjectProps,
        | "archiveProject"
        | "currentProject"
        | "switchCurrentProject"
        | "unarchiveProject"
      >
    > {
  archivedProjects: IProject[];
  projects: IProject[];
}

export const Projects = ({
  archivedProjects,
  archiveProject,
  createProject,
  currentProject,
  hideProjects,
  projects,
  switchCurrentProject,
  unarchiveProject
}: IProps) => {
  const [projectsArchived, setProjectsArchived] = useState(false);

  return (
    <Container>
      <ScrollContainer>
        {projectsArchived ? (
          <ProjectsContainer>
            {archivedProjects.map(project => (
              <Project
                key={project.id}
                project={project}
                unarchiveProject={unarchiveProject}
              />
            ))}
          </ProjectsContainer>
        ) : (
          <ProjectsContainer>
            {projects.map(project => (
              <Project
                archiveProject={archiveProject}
                currentProject={currentProject}
                key={project.id}
                project={project}
                switchCurrentProject={async () => {
                  hideProjects();
                  await switchCurrentProject(project);
                }}
              />
            ))}
          </ProjectsContainer>
        )}
      </ScrollContainer>
      <UpperButtonsContainer>
        <HideProjects hideProjects={hideProjects} />
      </UpperButtonsContainer>
      <LowerButtonsContainer>
        <ToggleProjects
          projectsArchived={projectsArchived}
          setProjectsArchived={setProjectsArchived}
        />
        <CreateProject
          createProject={async project => {
            hideProjects();
            await createProject(project);
          }}
        />
      </LowerButtonsContainer>
    </Container>
  );
};
