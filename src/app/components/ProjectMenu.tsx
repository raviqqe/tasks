import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import { useStore } from "@nanostores/react";
import { useEffect, useRef, useState } from "react";
import { MdArchive, MdDelete, MdEdit, MdUnarchive } from "react-icons/md";
import { projectArchiver } from "../../main/project-archiver.js";
import { projectCreator } from "../../main/project-creator.js";
import { projectDeleter } from "../../main/project-deleter.js";
import { projectPresenter } from "../../main/project-presenter.js";
import { projectUnarchiver } from "../../main/project-unarchiver.js";
import { projectUpdater } from "../../main/project-updater.js";
import { CreateProject } from "./CreateProject.js";
import { IconButton } from "./IconButton.js";
import { Loader } from "./Loader.js";
import { Project } from "./Project.js";
import { ToggleProjects } from "./ToggleProjects.js";
import { grey, lightGrey, white } from "./style.js";
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

interface Props {
  onHideProjects: () => void;
}

export const ProjectMenu = ({ onHideProjects }: Props): JSX.Element => {
  const [projectsArchived, setProjectsArchived] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const currentProject = useStore(projectPresenter.currentProject);
  const archivedProjects = useStore(projectPresenter.archivedProjects);
  const projects = useStore(projectPresenter.projects);

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
                  buttons={
                    <>
                      <IconButton
                        aria-label="Unarchive Project"
                        onClick={async () => {
                          await projectUnarchiver.unarchive(project);
                          onHideProjects();
                        }}
                      >
                        <MdUnarchive />
                      </IconButton>
                      <IconButton
                        aria-label="Delete Project"
                        onClick={() => projectDeleter.delete(project)}
                      >
                        <MdDelete />
                      </IconButton>
                    </>
                  }
                  currentProject={currentProject}
                  key={project.id}
                  project={project}
                />
              ))
            )}
          </ProjectsContainer>
        ) : (
          <ProjectsContainer>
            {projects.map((project) => (
              <Project
                buttons={
                  <>
                    <IconButton
                      aria-label="Update Project"
                      onClick={async () => {
                        const name = window.prompt(
                          "New project name?",
                          project.name,
                        );

                        if (!name) {
                          return;
                        }

                        await projectUpdater.update({ ...project, name });
                      }}
                    >
                      <MdEdit />
                    </IconButton>
                    <IconButton
                      aria-label="Archive project"
                      onClick={async () => {
                        await projectArchiver.archive(
                          project,
                          currentProject.id,
                        );
                      }}
                    >
                      <MdArchive />
                    </IconButton>
                  </>
                }
                currentProject={currentProject}
                key={project.id}
                onSwitchProject={onHideProjects}
                project={project}
                ref={project.id === currentProject.id ? ref : null}
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
          onCreate={async (name) => {
            await projectCreator.create(name);
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
