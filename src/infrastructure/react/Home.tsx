import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import { useState } from "react";
import { useAsync } from "react-use";
import { currentProjectInitializer } from "../../main/current-project-initializer.js";
import {
  CreateTodoTask,
  type Props as CreateTodoTaskProps,
} from "./CreateTodoTask.js";
import {
  DoneTaskList,
  type Props as DoneTaskListProps,
} from "./DoneTaskList.js";
import {
  TodoTaskList,
  type Props as TodoTaskListProps,
} from "./TodoTaskList.js";
import { ToggleTasks } from "./ToggleTasks.js";
import { TopBar, type Props as TopBarProps } from "./TopBar.js";

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

export interface Props
  extends CreateTodoTaskProps,
    DoneTaskListProps,
    TodoTaskListProps,
    TopBarProps {}

export const Home = ({
  currentProject,
  doneTasks,
  onShowProjects,
  todoTasks,
}: Props): JSX.Element => {
  useAsync(() => currentProjectInitializer.initialize(), []);
  const [tasksDone, setTasksDone] = useState(false);

  return (
    <Container>
      <TopBar currentProject={currentProject} onShowProjects={onShowProjects} />
      <TasksContainer>
        {tasksDone ? (
          <DoneTaskList doneTasks={doneTasks} />
        ) : (
          <TodoTaskList todoTasks={todoTasks} />
        )}
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
