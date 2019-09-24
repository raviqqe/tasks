import React from "react";
import { MdArchive, MdUnarchive, MdDelete } from "react-icons/md";
import styled from "styled-components";
import { IProject } from "../../domain/project";
import { IconButton } from "./IconButton";

const Container = styled.div`
  display: flex;
  justify-content: space-between
  align-items: center;
  font-size: 1.25em;
`;

const Name = styled.div<{ highlighted: boolean }>`
  word-break: break-word;
  margin-right: 1ex;
  flex: 1;
  cursor: ${({ onClick }) => (onClick ? "pointer" : "auto")};
  color: ${({ highlighted }) => (highlighted ? "indianred" : "black")};
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
  currentProject?: IProject;
  deleteProject?: (project: IProject) => Promise<void>;
  project: IProject;
  switchCurrentProject?: (project: IProject) => Promise<void>;
  unarchiveProject?: (project: IProject) => Promise<void>;
}

export const Project = ({
  archiveProject,
  currentProject,
  deleteProject,
  project,
  switchCurrentProject,
  unarchiveProject
}: IProps) => (
  <Container>
    <Name
      highlighted={!!currentProject && project.id === currentProject.id}
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
      {deleteProject && (
        <IconButton
          aria-label="Delete Project"
          onClick={() => deleteProject(project)}
        >
          <MdDelete />
        </IconButton>
      )}
    </ButtonsContainer>
  </Container>
);
