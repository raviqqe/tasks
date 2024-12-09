import { styled } from "@linaria/react";
import { forwardRef, type Ref } from "react";
import type * as domain from "../../domain.js";
import { currentProjectSwitcher } from "../../main/current-project-switcher.js";
import { black, red } from "./style/colors.js";

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
  onSwitchProject?: () => void;
  project: domain.Project;
}

const ProjectWithRef = (
  { buttons, currentProject, onSwitchProject, project }: Props,
  ref: Ref<HTMLDivElement>,
) => (
  <Container ref={ref}>
    <Name
      highlighted={!!currentProject && project.id === currentProject.id}
      onClick={async () => {
        await currentProjectSwitcher.switch(project);
        onSwitchProject?.();
      }}
    >
      {project.name}
    </Name>
    <ButtonsContainer>{buttons}</ButtonsContainer>
  </Container>
);

export const Project = forwardRef(ProjectWithRef);
