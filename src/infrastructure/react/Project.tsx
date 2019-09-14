import React from "react";
import styled from "styled-components";
import { IProject } from "../../domain/project";

const Container = styled.div`
  font-size: 2em;
  padding: 1em;
`;

export interface IProps {
  currentProject: IProject;
  projects: IProject[];
}

export const Project = ({ currentProject: { name } }: IProps) => (
  <Container>{name}</Container>
);
