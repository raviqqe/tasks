import { styled } from "@linaria/react";
import { useStore } from "@nanostores/react";
import { useNavigate } from "react-router";
import { projectPresenter } from "../../main/project-presenter.js";
import { white } from "../style.js";
import { Loader } from "./Loader.js";

const Container = styled.div`
  display: flex;
  align-items: center;
  color: ${white};
  font-size: 1.6rem;
  cursor: pointer;
  word-break: break-word;
  height: 4rem;
`;

export const CurrentProject = (): JSX.Element => {
  const project = useStore(projectPresenter.currentProject);
  const navigate = useNavigate();

  return (
    <Container onClick={() => navigate("/projects")}>
      {project?.name ?? <Loader />}
    </Container>
  );
};
