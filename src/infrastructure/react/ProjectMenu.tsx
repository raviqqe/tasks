import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import { useEffect, useRef, useState } from "react";
import type * as domain from "../../domain.js";
import {
  CreateProject,
  type Props as CreateProjectProps,
} from "./CreateProject.js";
import { Loader } from "./Loader.js";
import { Project, type Props as ProjectProps } from "./Project.js";
import { ToggleProjects } from "./ToggleProjects.js";
import { grey, lightGrey, white } from "./style/colors.js";
import { boxShadow } from "./style.js";

const Container = styled.div`
  background-color: ${lightGrey};
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
  background-color: ${white};
  border-radius: 0.5rem;
  padding: 1rem 1.5rem;

  > :not(:first-child) {
    margin-top: 0.75rem;
  }
`;

const Message = styled.div`
  color: ${grey};
`;

const LowerButtonsContainer = styled.div`
  position: fixed;
  right: 0.5rem;
  bottom: 0.5rem;

  > * {
    margin-top: 0.5rem;
  }
`;

export interface Props
  extends CreateProjectProps,
    Required<
      Omit<ProjectProps, "currentProject" | "project" | "onSwitchProject">
    > {
  archivedProjects: domain.Project[] | null;
  currentProject: domain.Project | null;
  onHideProjects: () => void;
  projects: domain.Project[] | null;
}

export const ProjectMenu = ({
  archivedProjects,
  archiveProject,
  createProject,
  currentProject,
  deleteProject,
  onHideProjects,
  projects,
  unarchiveProject,
  updateProject,
}: Props): JSX.Element => {
  const [projectsArchived, setProjectsArchived] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ block: "center" });
    }
  });

  return currentProject && archivedProjects && projects ? (
    <Container>
      <ScrollContainer>
        {projectsArchived ? (
          <ProjectsContainer>
            {archivedProjects.length === 0 ? (
              <Message>No archived projects</Message>
            ) : (
              archivedProjects.map((project) => (
                <Project
                  deleteProject={deleteProject}
                  key={project.id}
                  project={project}
                  unarchiveProject={async (project) => {
                    await unarchiveProject(project);
                    onHideProjects();
                  }}
                />
              ))
            )}
          </ProjectsContainer>
        ) : (
          <ProjectsContainer>
            {projects.map((project) => (
              <Project
                archiveProject={archiveProject}
                currentProject={currentProject}
                key={project.id}
                onSwitchProject={() => onHideProjects()}
                project={project}
                ref={project.id === currentProject.id ? ref : null}
                updateProject={updateProject}
              />
            ))}
          </ProjectsContainer>
        )}
      </ScrollContainer>
      <LowerButtonsContainer>
        <ToggleProjects
          projectsArchived={projectsArchived}
          setProjectsArchived={setProjectsArchived}
        />
        <CreateProject
          className={
            projectsArchived
              ? css`
                  visibility: hidden;
                `
              : undefined
          }
          createProject={async (name: string): Promise<void> => {
            await createProject(name);
            onHideProjects();
          }}
        />
      </LowerButtonsContainer>
    </Container>
  ) : (
    <Container>
      <Loader />
    </Container>
  );
};
