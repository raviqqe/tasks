import React from "react";
import styled from "styled-components";
import { IProject } from "../../domain/project";
import { CreateProject, IProps as ICreateProjectProps } from "./CreateProject";
import { boxShadow } from "./style";

const Container = styled.div`
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;

  > * {
    pointer-events: auto;
  }

  > :last-child {
    transform: translateY(-50%);
  }
`;

const ProjectsContainer = styled.div`
  ${boxShadow}
  color: black;
  font-size: 1.25rem;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 0.5rem;
  padding: 1rem 1.5rem 2.25rem;
  overflow: auto;

  > :not(:first-child) {
    margin-top: 0.5em;
  }
`;

const Project = styled.div``;

export interface IProps extends ICreateProjectProps {
  projects: IProject[];
  switchCurrentProject: (project: IProject) => Promise<void>;
}

export const Projects = ({
  createProject,
  projects,
  switchCurrentProject,
  ...restProps
}: IProps) => (
  <Container {...restProps}>
    <ProjectsContainer>
      {projects.map(project => (
        <Project key={project.id} onClick={() => switchCurrentProject(project)}>
          {project.name}
        </Project>
      ))}
    </ProjectsContainer>
    <CreateProject createProject={createProject} />
  </Container>
);
