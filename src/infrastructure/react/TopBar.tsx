import React from "react";
import styled from "styled-components";
import { IProject } from "../../domain/project";
import { boxShadow } from "./style";

const Container = styled.div`
  ${boxShadow}
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  font-size: 2rem;
  background-color: indianred;
  color: white;
  width: 100%;
  padding: 0.5em;
`;

export interface IProps {
  currentProject: IProject;
  projects: IProject[];
}

export const TopBar = ({ currentProject: { name } }: IProps) => (
  <Container>{name}</Container>
);
