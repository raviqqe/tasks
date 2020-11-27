import styled from "styled-components";
import {
  CurrentProject,
  IProps as ICurrentProjectProps,
} from "./CurrentProject";
import { SignOut, IProps as ISignOutProps } from "./SignOut";
import { boxShadow } from "./style";
import { red } from "./style/colors";

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

export const TopBar = ({ currentProject, showProjects, signOut }: IProps) => (
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
