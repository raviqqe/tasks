import { styled } from "@linaria/react";
import { forwardRef, type Ref } from "react";
import { useNavigate } from "react-router";
import type * as domain from "../../domain.js";
import { currentProjectSwitcher } from "../../main/current-project-switcher.js";
import { black, red } from "../style.js";
import styles from "./Project.module.css";

const Container = styled.div``;

const Name = styled.div<{ highlighted: boolean }>`
  word-break: break-word;
  margin-right: 1em;
  flex: 1;
  cursor: ${({ onClick }) => (onClick ? "pointer" : "auto")};
  color: ${({ highlighted }) => (highlighted ? red : black)};
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;

  > :not(:first-child) {
    margin-left: 0.25rem;
  }
`;

export interface Props {
  buttons?: JSX.Element;
  currentProject?: domain.Project;
  project: domain.Project;
}

export const Project = forwardRef(
  ({ buttons, currentProject, project }: Props, ref: Ref<HTMLDivElement>) => {
    const navigate = useNavigate();

    return (
      <Container ref={ref}>
        <Name
          highlighted={project.id === currentProject?.id}
          onClick={async () => {
            await navigate("/tasks");
            await currentProjectSwitcher.switch(project);
          }}
        >
          {project.name}
        </Name>
        <ButtonsContainer>{buttons}</ButtonsContainer>
      </Container>
    );
  },
);
Project.displayName = "Project";
