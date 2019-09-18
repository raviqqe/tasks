import React from "react";
import styled from "styled-components";
import { IProject } from "../../domain/project";
import { boxShadow } from "./style";

const Background = styled.div`
  ${boxShadow}
  position: absolute;
  background-color: indianred;
  width: 200vw;
  height: 100%;
  z-index: -1;
  top: 0;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  color: white;
  font-size: 2em;
  padding: 0.5em;
`;

export interface IProps {
  currentProject: IProject;
  projects: IProject[];
}

export const Project = ({ currentProject: { name } }: IProps) => (
  <Container>
    <Background />
    {name}
  </Container>
);
