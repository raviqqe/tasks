import React from "react";
import styled from "styled-components";
import { IProject } from "../../domain/project";

const Container = styled.div`
  color: white;
  font-size: 2rem;
  padding: 0.5em;
`;

export interface IProps {
  currentProject: IProject;
  projects: IProject[];
}

export const Project = ({ currentProject: { name } }: IProps) => (
  <Container>{name}</Container>
);
