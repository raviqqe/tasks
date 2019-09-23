import React from "react";
import styled from "styled-components";
import { IProject } from "../../domain/project";
import { CreateProject, IProps as ICreateProjectProps } from "./CreateProject";
import { HideProjects, IProps as IHideProjectsProps } from "./HideProjects";
import { Project, IProps as IProjectProps } from "./Project";

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

const HideProjectsContainer = styled.div`
  position: fixed;
  right: 0.5rem;
  top: 0.5rem;
`;

const CreateProjectContainer = styled.div`
  position: fixed;
  right: 0.5rem;
  bottom: 0.5rem;
`;

export interface IProps
  extends ICreateProjectProps,
    IHideProjectsProps,
    Omit<IProjectProps, "project"> {
  projects: IProject[];
}

export const Projects = ({
  archiveProject,
  createProject,
  hideProjects,
  projects,
  switchCurrentProject
}: IProps) => (
  <Container>
    <ScrollContainer>
      <ProjectsContainer>
        {projects.map(project => (
          <Project
            archiveProject={archiveProject}
            key={project.id}
            project={project}
            switchCurrentProject={async () => {
              hideProjects();
              await switchCurrentProject(project);
            }}
          />
        ))}
      </ProjectsContainer>
    </ScrollContainer>
    <HideProjectsContainer>
      <HideProjects hideProjects={hideProjects} />
    </HideProjectsContainer>
    <CreateProjectContainer>
      <CreateProject
        createProject={async project => {
          hideProjects();
          await createProject(project);
        }}
      />
    </CreateProjectContainer>
  </Container>
);
