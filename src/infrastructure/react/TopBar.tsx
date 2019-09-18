import React from "react";
import styled from "styled-components";
import { IProject } from "../../domain/project";
import { boxShadow } from "./style";
import { SignOut, IProps as ISignOutProps } from "./SignOut";

const Container = styled.div`
  ${boxShadow}
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  background-color: indianred;
  width: 100%;
`;

const Project = styled.div`
  color: white;
  font-size: 2rem;
  padding: 0.5em;
`;

const SignOutContainer = styled.div`
  position: absolute;
  right: 1em;
  top: 50%;
  transform: translateY(-50%);
`;

const StyledSignOut = styled(SignOut)`
  color: white;
  font-size: 1.75rem;
`;

export interface IProps extends ISignOutProps {
  currentProject: IProject;
  projects: IProject[];
}

export const TopBar = ({ currentProject: { name }, signOut }: IProps) => (
  <Container>
    <Project>{name}</Project>
    <SignOutContainer>
      <StyledSignOut signOut={signOut} />
    </SignOutContainer>
  </Container>
);
