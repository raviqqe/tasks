import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import { useState } from "react";
import { useAsync } from "@raviqqe/react-hooks";
import { currentProjectInitializer } from "../../main/current-project-initializer.js";
import { CreateTodoTask } from "./CreateTodoTask.js";
import { DoneTaskList } from "./DoneTaskList.js";
import { TodoTaskList } from "./TodoTaskList.js";
import { ToggleTasks } from "./ToggleTasks.js";
import { type Props, TopBar } from "./TopBar.js";

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

export const Home = ({ onShowProjects }: Props): JSX.Element => {
  useAsync(() => currentProjectInitializer.initialize(), []);
  const [tasksDone, setTasksDone] = useState(false);

  return (
    <Container>
      <TopBar onShowProjects={onShowProjects} />
      <TasksContainer>
        {tasksDone ? <DoneTaskList /> : <TodoTaskList />}
      </TasksContainer>
      <ButtonsContainer>
        <ToggleTasks setTasksDone={setTasksDone} tasksDone={tasksDone} />
        <CreateTodoTask
          className={
            tasksDone
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
