import { styled } from "@linaria/react";
import { signOutManager } from "../../main/sign-out-manager.js";
import { CurrentProject, type Props } from "./CurrentProject.js";
import { SignOut } from "./SignOut.js";
import { red } from "./style/colors.js";
import { boxShadow } from "./style.js";

const Container = styled.div`
  ${boxShadow}
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  background-color: ${red};
  width: 100%;
`;

const SignOutContainer = styled.div`
  position: absolute;
  right: 1em;
  top: 50%;
  transform: translateY(-50%);
`;

export { type Props };

export const TopBar = ({
  currentProject,
  showProjects,
}: Props): JSX.Element => (
  <Container>
    <CurrentProject
      currentProject={currentProject}
      showProjects={showProjects}
    />
    <SignOutContainer>
      <SignOut signOut={() => signOutManager.signOut()} />
    </SignOutContainer>
  </Container>
);
