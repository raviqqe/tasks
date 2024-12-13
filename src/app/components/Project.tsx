import { styled } from "@linaria/react";
import { forwardRef, type Ref } from "react";
import { useNavigate } from "react-router";
import type * as domain from "../../domain.js";
import { currentProjectSwitcher } from "../../main/current-project-switcher.js";
import { black, red } from "../style.js";

const Container = styled.div`
  display: flex;
  justify-content: space-between
  align-items: center;
  font-size: 1.25em;
`;

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
            await currentProjectSwitcher.switch(project);
            await navigate("/tasks");
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
