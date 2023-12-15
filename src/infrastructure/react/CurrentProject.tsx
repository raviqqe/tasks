import { defaultImport } from "default-import";
import defaultStyled from "styled-components";
import { type Project } from "../../domain/project.js";
import { Loader } from "./Loader.js";
import { white } from "./style/colors.js";

const styled = defaultImport(defaultStyled);

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
  showProjects: () => void;
}

export const CurrentProject = ({
  currentProject,
  showProjects,
}: Props): JSX.Element => (
  <Container onClick={showProjects}>
    {currentProject ? currentProject.name : <Loader />}
  </Container>
);
