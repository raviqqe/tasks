import styled from "styled-components";
import {
  CurrentProject,
  IProps as ICurrentProjectProps,
} from "./CurrentProject.js";
import { SignOut, IProps as ISignOutProps } from "./SignOut.js";
import { red } from "./style/colors.js";
import { boxShadow } from "./style/index.js";

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

export interface IProps extends ICurrentProjectProps, ISignOutProps {}

export const TopBar = ({
  currentProject,
  showProjects,
  signOut,
}: IProps): JSX.Element => (
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
