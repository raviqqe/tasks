import React from "react";
import styled from "styled-components";
import { IProject } from "../../domain/project";

const Container = styled.div`
  color: white;
  font-size: 1.7rem;
  padding: 0.5em;
  cursor: pointer;
  word-break: break-word;
`;

export interface IProps {
  currentProject: IProject;
  showProjects: () => void;
}

export const CurrentProject = ({
  currentProject: { name },
  showProjects
}: IProps) => <Container onClick={showProjects}>{name}</Container>;
