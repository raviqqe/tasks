import { forwardRef, Ref } from "react";
import {
  MdArchive,
  MdUnarchive,
  MdDelete,
  MdEdit,
} from "react-icons/md/index.js";
import styled from "styled-components";
import { IProject } from "../../domain/project";
import { IconButton } from "./IconButton";
import { black, red } from "./style/colors";

const Container = styled.div`
  display: flex;
  justify-content: space-between
  align-items: center;
  font-size: 1.25em;
`;

const Name = styled.div<{ highlighted: boolean }>`
  word-break: break-word;
  margin-right: 1em;
  flex: 1;
  cursor: ${({ onClick }) => (onClick ? "pointer" : "auto")};
  color: ${({ highlighted }) => (highlighted ? red : black)};
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;

  > :not(:first-child) {
    margin-left: 0.25rem;
  }
`;

export interface IProps {
  archiveProject?: (
    project: IProject,
    currentProjectId: string
  ) => Promise<void>;
  currentProject?: IProject;
  deleteProject?: (project: IProject) => Promise<void>;
  project: IProject;
  switchCurrentProject?: (project: IProject) => Promise<void>;
  unarchiveProject?: (project: IProject) => Promise<void>;
  updateProject?: (project: IProject) => Promise<void>;
}

const ProjectWithRef = (
  {
    archiveProject,
    currentProject,
    deleteProject,
    project,
    switchCurrentProject,
    unarchiveProject,
    updateProject,
  }: IProps,
  ref: Ref<HTMLDivElement>
) => (
  <Container ref={ref}>
    <Name
      highlighted={!!currentProject && project.id === currentProject.id}
      onClick={switchCurrentProject && (() => switchCurrentProject(project))}
    >
      {project.name}
    </Name>
    <ButtonsContainer>
      {updateProject && (
        <IconButton
          aria-label="Update Project"
          onClick={async () => {
            const name = window.prompt("New project name?", project.name);

            if (!name) {
              return;
            }

            await updateProject({ ...project, name });
          }}
        >
          <MdEdit />
        </IconButton>
      )}
      {archiveProject && (
        <IconButton
          aria-label="Archive Project"
          onClick={async () => {
            if (currentProject) {
              await archiveProject(project, currentProject.id);
            }
          }}
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

export const Project = forwardRef(ProjectWithRef);
