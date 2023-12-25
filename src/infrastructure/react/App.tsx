import { useState } from "react";
import { useAsync } from "react-use";
import { styled } from "@linaria/react";
import { Home, type Props as HomeProps } from "./Home.js";
import { type Props as LandingProps, Landing } from "./Landing.js";
import { Loader } from "./Loader.js";
import { ProjectMenu, type Props as ProjectMenuProps } from "./ProjectMenu.js";

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

export interface Props
  extends Omit<HomeProps, "showProjects">,
    Omit<ProjectMenuProps, "hideProjects">,
    LandingProps {
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
}: Props): JSX.Element => {
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
