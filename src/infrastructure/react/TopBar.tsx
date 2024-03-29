import { styled } from "@linaria/react";
import {
  CurrentProject,
  type Props as CurrentProjectProps,
} from "./CurrentProject.js";
import { SignOut, type Props as SignOutProps } from "./SignOut.js";
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

export interface Props extends CurrentProjectProps, SignOutProps {}

export const TopBar = ({
  currentProject,
  showProjects,
  signOut,
}: Props): JSX.Element => (
  <Container>
    <CurrentProject
      currentProject={currentProject}
      showProjects={showProjects}
    />
    <SignOutContainer>
      <SignOut signOut={signOut} />
    </SignOutContainer>
  </Container>
);
