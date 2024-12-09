import { styled } from "@linaria/react";
import { useState } from "react";
import { useAsync } from "react-use";
import { applicationInitializer } from "../../main/application-initializer.js";
import { Home, type Props as HomeProps } from "./Home.js";
import { Landing } from "./Landing.js";
import { Loader } from "./Loader.js";
import { ProjectMenu, type Props as ProjectMenuProps } from "./ProjectMenu.js";

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

export interface Props extends HomeProps, ProjectMenuProps {
  signedIn: boolean | null;
}

export const App = ({
  archivedProjects,
  archiveProject,
  createProject,
  currentProject,
  deleteProject,
  doneTasks,
  projects,
  signedIn,
  todoTasks,
  unarchiveProject,
  updateProject,
  ...props
}: Props): JSX.Element => {
  useAsync(() => applicationInitializer.initialize(), []);
  const [projectsShown, setProjectsShown] = useState(false);

  return signedIn === null ? (
    <LoaderContainer>
      <Loader />
    </LoaderContainer>
  ) : signedIn && projectsShown ? (
    <ProjectMenu
      archivedProjects={archivedProjects}
      archiveProject={archiveProject}
      createProject={createProject}
      currentProject={currentProject}
      deleteProject={deleteProject}
      onHideProjects={() => setProjectsShown(false)}
      projects={projects}
      unarchiveProject={unarchiveProject}
      updateProject={updateProject}
    />
  ) : signedIn ? (
    <Home
      {...props}
      currentProject={currentProject}
      doneTasks={doneTasks}
      onShowProjects={() => setProjectsShown(true)}
      todoTasks={todoTasks}
    />
  ) : (
    <Landing />
  );
};
