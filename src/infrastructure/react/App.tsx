import { defaultImport } from "default-import";
import { useState } from "react";
import { useAsync } from "react-use";
import defaultStyled from "styled-components";
import { Home, IProps as IHomeProps } from "./Home.js";
import { IProps as ILandingProps, Landing } from "./Landing.js";
import { Loader } from "./Loader.js";
import { ProjectMenu, IProps as IProjectMenuProps } from "./ProjectMenu.js";

const styled = defaultImport(defaultStyled);

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
  repositoryUrl,
  signedIn,
  signIn,
  signOut,
  switchCurrentProject,
  todoTasks,
  unarchiveProject,
  updateProject,
  ...props
}: IProps): JSX.Element => {
  useAsync(initialize, []);
  const [projectsShown, setProjectsShown] = useState(false);

  return signedIn === null ? (
    <LoaderContainer>
      <Loader />
    </LoaderContainer>
  ) : signedIn && projectsShown ? (
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
  ) : signedIn ? (
    <Home
      {...props}
      currentProject={currentProject}
      doneTasks={doneTasks}
      showProjects={() => setProjectsShown(true)}
      signOut={signOut}
      todoTasks={todoTasks}
    />
  ) : (
    <Landing repositoryUrl={repositoryUrl} signIn={signIn} />
  );
};
