import { type JSX, useState } from "react";
import { Home } from "../components/Home.js";
import { ProjectMenu } from "../components/ProjectMenu.js";

export default (): JSX.Element => {
  const [projectsShown, setProjectsShown] = useState(false);

  return projectsShown ? (
    <ProjectMenu onHideProjects={() => setProjectsShown(false)} />
  ) : (
    <Home onShowProjects={() => setProjectsShown(true)} />
  );
};
