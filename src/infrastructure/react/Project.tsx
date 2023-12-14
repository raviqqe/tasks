import { defaultImport } from "default-import";
import { forwardRef, type Ref } from "react";
import {
  MdArchive,
  MdUnarchive,
  MdDelete,
  MdEdit,
} from "react-icons/md/index.js";
import defaultStyled from "styled-components";
import { type Project } from "../../domain/project.js";
import { IconButton } from "./IconButton.js";
import { black, red } from "./style/colors.js";

const styled = defaultImport(defaultStyled);

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

export interface Props {
  archiveProject?: (
    project: Project,
    currentProjectId: string,
  ) => Promise<void>;
  currentProject?: Project;
  deleteProject?: (project: Project) => Promise<void>;
  project: Project;
  switchCurrentProject?: (project: Project) => Promise<void>;
  unarchiveProject?: (project: Project) => Promise<void>;
  updateProject?: (project: Project) => Promise<void>;
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
  }: Props,
  ref: Ref<HTMLDivElement>,
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
