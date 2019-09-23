import { PulseLoader } from "react-spinners";
import { useAsync } from "react-use";
import React, { useState } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { AuthenticationStore } from "../mobx/authentication-store";
import { TasksStore } from "../mobx/tasks-store";
import { ProjectsStore } from "../mobx/projects-store";
import { IProps as ILandingProps, Landing } from "./Landing";
import { Home, IProps as IHomeProps } from "./Home";
import { Projects, IProps as IProjectsProps } from "./Projects";

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

interface IProps
  extends Omit<
      IHomeProps,
      "currentProject" | "doneTasks" | "showProjects" | "todoTasks"
    >,
    Omit<
      IProjectsProps,
      "archivedProjects" | "currentProject" | "hideProjects" | "projects"
    >,
    ILandingProps {
  authenticationStore: AuthenticationStore;
  projectsStore: ProjectsStore;
  tasksStore: TasksStore;
  initialize: () => Promise<void>;
}

export const App = observer(
  ({
    archiveProject,
    authenticationStore: { signedIn },
    createProject,
    projectsStore: { archivedProjects, currentProject, projects },
    tasksStore: { doneTasks, todoTasks },
    initialize,
    repositoryURL,
    signIn,
    signOut,
    switchCurrentProject,
    unarchiveProject,
    ...props
  }: IProps) => {
    useAsync(initialize, []);
    const [projectsShown, setProjectsShown] = useState(false);

    return signedIn && !projectsShown && currentProject ? (
      <Home
        {...props}
        currentProject={currentProject}
        doneTasks={doneTasks}
        showProjects={() => setProjectsShown(true)}
        signOut={signOut}
        todoTasks={todoTasks}
      />
    ) : signedIn &&
      projectsShown &&
      currentProject &&
      projects &&
      archivedProjects ? (
      <Projects
        archiveProject={archiveProject}
        archivedProjects={archivedProjects}
        createProject={createProject}
        currentProject={currentProject}
        hideProjects={() => setProjectsShown(false)}
        projects={projects}
        switchCurrentProject={switchCurrentProject}
        unarchiveProject={unarchiveProject}
      />
    ) : signedIn === false ? (
      <Landing repositoryURL={repositoryURL} signIn={signIn} />
    ) : (
      <LoaderContainer>
        <PulseLoader color="white" />
      </LoaderContainer>
    );
  }
);
