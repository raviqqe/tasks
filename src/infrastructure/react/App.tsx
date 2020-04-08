import React, { useState } from "react";
import { useAsync } from "react-use";
import styled from "styled-components";
import { Home, IProps as IHomeProps } from "./Home";
import { IProps as ILandingProps, Landing } from "./Landing";
import { Loader } from "./Loader";
import { ProjectMenu, IProps as IProjectMenuProps } from "./ProjectMenu";

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

export interface IProps
  extends Omit<IHomeProps, "showProjects">,
    Omit<IProjectMenuProps, "hideProjects">,
    ILandingProps {
  initialize: () => Promise<void>;
  signedIn: boolean | null;
}

export const App = ({
  archivedProjects,
  archiveProject,
  createProject,
  currentProject,
  deleteProject,
  doneTasks,
  initialize,
  projects,
  repositoryURL,
  signedIn,
  signIn,
  signOut,
  switchCurrentProject,
  todoTasks,
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
      archivedProjects={archivedProjects}
      archiveProject={archiveProject}
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
};
