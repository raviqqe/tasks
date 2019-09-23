import React from "react";
import { MdArchive, MdUnarchive } from "react-icons/md";
import styled from "styled-components";
import { IProject } from "../../domain/project";
import { IconButton } from "./IconButton";

const Container = styled.div`
  display: flex;
  justify-content: space-between
  align-items: center;
  font-size: 1.25em;
`;

const Name = styled.div`
  word-break: break-word;
  margin-right: 0.5ex;
  flex: 1;
  cursor: ${props => (props.onClick ? "pointer" : "auto")};
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;

  > :not(:first-child) {
    margin-left: 0.25rem;
  }
`;

export interface IProps {
  archiveProject?: (project: IProject) => Promise<void>;
  project: IProject;
  switchCurrentProject?: (project: IProject) => Promise<void>;
  unarchiveProject?: (project: IProject) => Promise<void>;
}

export const Project = ({
  archiveProject,
  project,
  switchCurrentProject,
  unarchiveProject
}: IProps) => (
  <Container>
    <Name
      onClick={switchCurrentProject && (() => switchCurrentProject(project))}
    >
      {project.name}
    </Name>
    <ButtonsContainer>
      {archiveProject && (
        <IconButton
          aria-label="Archive Project"
          onClick={() => archiveProject(project)}
        >
          <MdArchive />
        </IconButton>
      )}
      {unarchiveProject && (
        <IconButton
          aria-label="Unarchive Project"
          onClick={() => unarchiveProject(project)}
        >
          <MdUnarchive />
        </IconButton>
      )}
    </ButtonsContainer>
  </Container>
);
