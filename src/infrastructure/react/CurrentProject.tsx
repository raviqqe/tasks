import { styled } from "@linaria/react";
import { type Project } from "../../domain/project.js";
import { Loader } from "./Loader.js";
import { white } from "./style/colors.js";

const Container = styled.div`
  display: flex;
  align-items: center;
  color: ${white};
  font-size: 1.6rem;
  cursor: pointer;
  word-break: break-word;
  height: 4rem;
`;

export interface Props {
  currentProject: Project | null;
  onShowProjects: () => void;
}

export const CurrentProject = ({
  currentProject,
  onShowProjects,
}: Props): JSX.Element => (
  <Container onClick={onShowProjects}>
    {currentProject ? currentProject.name : <Loader />}
  </Container>
);
