import { useStore } from "@nanostores/react";
import { type JSX, useEffect, useRef, useState } from "react";
import { MdArchive, MdDelete, MdEdit, MdUnarchive } from "react-icons/md";
import { useNavigate } from "react-router";
import { currentProjectSwitcher } from "../../../main/current-project-switcher.js";
import { projectArchiver } from "../../../main/project-archiver.js";
import { projectCreator } from "../../../main/project-creator.js";
import { projectDeleter } from "../../../main/project-deleter.js";
import { projectPresenter } from "../../../main/project-presenter.js";
import { projectUnarchiver } from "../../../main/project-unarchiver.js";
import { projectUpdater } from "../../../main/project-updater.js";
import { CreateProject } from "../../components/CreateProject.js";
import { IconButton } from "../../components/IconButton.js";
import { Loader } from "../../components/Loader.js";
import { Project } from "../../components/Project.js";
import { ToggleProjects } from "../../components/ToggleProjects.js";
import styles from "./route.module.css";

export default (): JSX.Element => {
  const currentProject = useStore(projectPresenter.currentProject);
  const archivedProjects = useStore(projectPresenter.archivedProjects);
  const projects = useStore(projectPresenter.projects);
  const [projectsArchived, setProjectsArchived] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    ref.current?.scrollIntoView({ block: "center" });
  }, [ref.current]);

  return currentProject && archivedProjects && projects ? (
    <div className={styles.root}>
      <div className={styles.scrollContainer}>
        {projectsArchived ? (
          <div className={styles.projectsContainer}>
            {archivedProjects.length === 0 ? (
              <div className={styles.message}>No archived projects</div>
            ) : (
              archivedProjects.map((project) => (
                <Project
                  buttons={
                    <>
                      <IconButton
                        aria-label="Unarchive Project"
                        onClick={async () => {
                          await navigate("/tasks");
                          await projectUnarchiver.unarchive(project);
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
          </div>
        ) : (
          <div className={styles.projectsContainer}>
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
                onClick={async () => {
                  await navigate("/tasks");
                  await currentProjectSwitcher.switch(project);
                }}
                project={project}
                ref={project.id === currentProject.id ? ref : null}
              />
            ))}
          </div>
        )}
      </div>
      <div className={styles.lowerButtonsContainer}>
        <ToggleProjects
          projectsArchived={projectsArchived}
          setProjectsArchived={setProjectsArchived}
        />
        <CreateProject
          className={projectsArchived ? styles.hidden : undefined}
          onCreate={async (name) => {
            await projectCreator.create(name);
            await navigate("/tasks");
          }}
        />
      </div>
    </div>
  ) : (
    <div className={styles.root}>
      <Loader />
    </div>
  );
};
