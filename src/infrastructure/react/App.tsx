import { PulseLoader } from "react-spinners";
import { useAsync } from "react-use";
import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { AuthenticationStore } from "../mobx/authentication-store";
import { TasksStore } from "../mobx/tasks-store";
import { ProjectsStore } from "../mobx/projects-store";
import { IProps as ILandingProps, Landing } from "./Landing";
import { Home, IProps as IHomeProps } from "./Home";

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

interface IProps
  extends Omit<
      IHomeProps,
      "currentProject" | "doneTasks" | "projects" | "todoTasks"
    >,
    ILandingProps {
  authenticationStore: AuthenticationStore;
  projectsStore: ProjectsStore;
  tasksStore: TasksStore;
  initialize: () => Promise<void>;
}

export const App = observer(
  ({
    authenticationStore: { signedIn },
    projectsStore: { currentProject, projects },
    tasksStore: { doneTasks, todoTasks },
    initialize,
    repositoryURL,
    signIn,
    signOut,
    ...props
  }: IProps) => {
    useAsync(initialize, []);

    return signedIn && currentProject && projects ? (
      <Home
        {...props}
        currentProject={currentProject}
        doneTasks={doneTasks}
        projects={projects}
        todoTasks={todoTasks}
        signOut={signOut}
      />
    ) : signedIn === false ? (
      <Landing repositoryURL={repositoryURL} signIn={signIn} />
    ) : (
      <LoaderContainer>
        <PulseLoader color="white" />
      </LoaderContainer>
    );
  }
);
