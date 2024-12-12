import { styled } from "@linaria/react";
import { useStore } from "@nanostores/react";
import { projectPresenter } from "../../main/project-presenter.js";
import { Loader } from "./Loader.js";
import { white } from "../style.js";

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
  onShowProjects: () => void;
}

export const CurrentProject = ({ onShowProjects }: Props): JSX.Element => {
  const project = useStore(projectPresenter.currentProject);

  return (
    <Container onClick={onShowProjects}>
      {project?.name ?? <Loader />}
    </Container>
  );
};
