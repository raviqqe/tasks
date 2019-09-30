import React from "react";
import styled from "styled-components";
import { IProject } from "../../domain/project";
import { white } from "./style/colors";
import { Loader } from "./Loader";

const Container = styled.div`
  display: flex;
  align-items: center;
  color: ${white};
  font-size: 1.6rem;
  cursor: pointer;
  word-break: break-word;
  height: 4rem;
`;

export interface IProps {
  currentProject: IProject | null;
  showProjects: () => void;
}

export const CurrentProject = ({ currentProject, showProjects }: IProps) => (
  <Container onClick={showProjects}>
    {currentProject ? currentProject.name : <Loader />}
  </Container>
);
