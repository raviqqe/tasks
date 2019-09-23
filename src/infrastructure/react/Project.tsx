import React from "react";
import styled from "styled-components";
import { IProject } from "../../domain/project";

const Container = styled.div`
  color: white;
  font-size: 1.7rem;
  padding: 0.5em;
`;

const Name = styled.div`
  cursor: pointer;
  word-break: break-word;
`;

export interface IProps {
  currentProject: IProject;
  showProjects: () => void;
}

export const Project = ({ currentProject: { name }, showProjects }: IProps) => (
  <Container>
    <Name onClick={showProjects}>{name}</Name>
  </Container>
);
