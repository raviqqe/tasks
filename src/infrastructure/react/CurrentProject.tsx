import { defaultImport } from "default-import";
import defaultStyled from "styled-components";
import { IProject } from "../../domain/project.js";
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

export interface IProps {
  currentProject: IProject | null;
  showProjects: () => void;
}

export const CurrentProject = ({
  currentProject,
  showProjects,
}: IProps): JSX.Element => (
  <Container onClick={showProjects}>
    {currentProject ? currentProject.name : <Loader />}
  </Container>
);
