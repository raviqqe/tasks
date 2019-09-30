import { useAsync } from "react-use";
import React, { useState } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { AuthenticationStore } from "../mobx/authentication-store";
import { TasksStore } from "../mobx/tasks-store";
import { ProjectsStore } from "../mobx/projects-store";
import { IProps as ILandingProps, Landing } from "./Landing";
import { Home, IProps as IHomeProps } from "./Home";
import { ProjectMenu, IProps as IProjectMenuProps } from "./ProjectMenu";
import { Loader } from "./Loader";

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

export interface IProps
  extends Omit<
      IHomeProps,
      "currentProject" | "doneTasks" | "showProjects" | "todoTasks"
    >,
    Omit<
      IProjectMenuProps,
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
    deleteProject,
    projectsStore: { archivedProjects, currentProject, projects },
    tasksStore: { doneTasks, todoTasks },
    initialize,
    repositoryURL,
    signIn,
    signOut,
    switchCurrentProject,
    unarchiveProject,
    updateProject,
    ...props
  }: IProps) => {
    useAsync(initialize, []);
    const [projectsShown, setProjectsShown] = useState(false);

    return signedIn && !projectsShown ? (
      <Home
        {...props}
        currentProject={currentProject}
        doneTasks={doneTasks}
        showProjects={() => setProjectsShown(true)}
        signOut={signOut}
        todoTasks={todoTasks}
      />
    ) : signedIn ? (
      <ProjectMenu
        archiveProject={archiveProject}
        archivedProjects={archivedProjects}
        createProject={createProject}
        currentProject={currentProject}
        deleteProject={deleteProject}
        hideProjects={() => setProjectsShown(false)}
        projects={projects}
        switchCurrentProject={switchCurrentProject}
        unarchiveProject={unarchiveProject}
        updateProject={updateProject}
      />
    ) : signedIn === false ? (
      <Landing repositoryURL={repositoryURL} signIn={signIn} />
    ) : (
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
    );
  }
);
