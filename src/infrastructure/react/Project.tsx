import React, { useState } from "react";
import styled from "styled-components";
import { IProject } from "../../domain/project";
import { Projects, IProps as IProjectsProps } from "./Projects";

const Container = styled.div`
  color: white;
  font-size: 1.7rem;
  padding: 0.5em;
`;

const Name = styled.div`
  cursor: pointer;
  word-break: break-word;
`;

const ProjectsContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  > * {
    margin: 1rem;
  }
`;

export interface IProps extends IProjectsProps {
  currentProject: IProject;
}

export const Project = ({
  createProject,
  currentProject: { name },
  projects,
  switchCurrentProject
}: IProps) => {
  const [projectsShown, setProjectsShown] = useState(false);

  return (
    <Container>
      <Name onClick={() => setProjectsShown(true)}>{name}</Name>
      {projectsShown && (
        <ProjectsContainer onClick={() => setProjectsShown(false)}>
          <Projects
            createProject={async (name: string) => {
              setProjectsShown(false);
              await createProject(name);
            }}
            projects={projects}
            switchCurrentProject={async (project: IProject) => {
              setProjectsShown(false);
              await switchCurrentProject(project);
            }}
          />
        </ProjectsContainer>
      )}
    </Container>
  );
};
