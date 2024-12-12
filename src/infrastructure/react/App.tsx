import { styled } from "@linaria/react";
import { useStore } from "@nanostores/react";
import { useState } from "react";
import { useAsync } from "react-use";
import { applicationInitializer } from "../../main/application-initializer.js";
import { authenticationPresenter } from "../../main/authentication-presenter.js";
import { Home } from "./Home.js";
import { Landing } from "./Landing.js";
import { Loader } from "./Loader.js";
import { ProjectMenu } from "./ProjectMenu.js";

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

export const App = (): JSX.Element => {
  useAsync(() => applicationInitializer.initialize(), []);
  const signedIn = useStore(authenticationPresenter.signedIn);
  const [projectsShown, setProjectsShown] = useState(false);

  return signedIn === null ? (
    <LoaderContainer>
      <Loader />
    </LoaderContainer>
  ) : signedIn && projectsShown ? (
    <ProjectMenu onHideProjects={() => setProjectsShown(false)} />
  ) : signedIn ? (
    <Home onShowProjects={() => setProjectsShown(true)} />
  ) : (
    <Landing />
  );
};
