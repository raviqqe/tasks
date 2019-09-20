import React, { useState } from "react";
import styled from "styled-components";
import { IProject } from "../../domain/project";
import { Projects, IProps as IProjectsProps } from "./Projects";

const Container = styled.div`
  position: relative;
  color: white;
  font-size: 1.7rem;
  padding: 0.5em;
`;

const Name = styled.div``;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;

const StyledProjects = styled(Projects)`
  position: absolute;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  max-height: calc(100vh - 2rem);
`;

export interface IProps extends IProjectsProps {
  currentProject: IProject;
}

export const Project = ({
  createProject,
  currentProject: { name },
  projects
}: IProps) => {
  const [projectsShown, setProjectsShown] = useState(false);

  return (
    <Container>
      <Name onClick={() => setProjectsShown(true)}>{name}</Name>
      {projectsShown && (
        <>
          <Background onClick={() => setProjectsShown(false)} />
          <StyledProjects
            createProject={async (name: string) => {
              setProjectsShown(false);
              await createProject(name);
            }}
            projects={projects}
          />
        </>
      )}
    </Container>
  );
};
