import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import { useAsync } from "@raviqqe/react-hooks";
import type { JSX } from "react";
import { Outlet, useLocation } from "react-router";
import { currentProjectInitializer } from "../../../main/current-project-initializer.js";
import { CreateTodoTask } from "../../components/CreateTodoTask.js";
import { ToggleTasks } from "../../components/ToggleTasks.js";
import { TopBar } from "../../components/TopBar.js";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  margin: auto;
`;

const TasksContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70ex;
  max-width: 100%;
  flex: 1;
  overflow: hidden;

  > * {
    flex: 1;
  }
`;

const ButtonsContainer = styled.div`
  position: fixed;
  bottom: 0.5rem;
  right: 0.5rem;

  > * {
    margin-top: 0.5rem;
  }
`;

export default (): JSX.Element => {
  useAsync(() => currentProjectInitializer.initialize(), []);
  const { pathname } = useLocation();

  return (
    <Container>
      <TopBar />
      <TasksContainer>
        <Outlet />
      </TasksContainer>
      <ButtonsContainer>
        <ToggleTasks />
        <CreateTodoTask
          className={
            pathname === "/tasks/done"
              ? css`
                  visibility: hidden;
                `
              : undefined
          }
        />
      </ButtonsContainer>
    </Container>
  );
};
