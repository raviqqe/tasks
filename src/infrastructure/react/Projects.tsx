import React from "react";
import styled from "styled-components";
import { IProject } from "../../domain/project";
import { CreateProject, IProps as ICreateProjectProps } from "./CreateProject";
import { HideProjects, IProps as IHideProjectsProps } from "./HideProjects";

const Container = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  overflow: auto;
`;

const ProjectsContainer = styled.div`
  font-size: 1.25rem;
  display: flex;
  flex-direction: column;
  padding: 1rem 1.5rem;
  max-width: 50ex;

  > :not(:first-child) {
    margin-top: 0.5em;
  }
`;

const Project = styled.div`
  cursor: pointer;
  word-break: break-word;
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

export interface IProps extends ICreateProjectProps, IHideProjectsProps {
  currentProject: IProject;
  projects: IProject[];
  switchCurrentProject: (project: IProject) => Promise<void>;
}

export const Projects = ({
  createProject,
  hideProjects,
  projects,
  switchCurrentProject
}: IProps) => (
  <Container>
    <ProjectsContainer>
      {projects.map(project => (
        <Project
          key={project.id}
          onClick={async () => {
            hideProjects();
            await switchCurrentProject(project);
          }}
        >
          {project.name}
        </Project>
      ))}
    </ProjectsContainer>
    <HideProjectsContainer>
      <HideProjects hideProjects={hideProjects} />
    </HideProjectsContainer>
    <CreateProjectContainer>
      <CreateProject createProject={createProject} />
    </CreateProjectContainer>
  </Container>
);
