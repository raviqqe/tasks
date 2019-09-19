import React, { useState } from "react";
import styled from "styled-components";
import {
  CreateTodoTask,
  IProps as ICreateTodoTaskProps
} from "./CreateTodoTask";
import { TodoTasks, IProps as ITodoTasksProps } from "./TodoTasks";
import { DoneTasks, IProps as IDoneTasksProps } from "./DoneTasks";
import { TopBar, IProps as ITopBarProps } from "./TopBar";
import { ToggleTasks } from "./ToggleTasks";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  margin: auto;

  > :last-child {
    flex: 1;
  }
`;

const TasksContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70ex;
  max-width: 100%;
  overflow: hidden;
`;

const ButtonsContainer = styled.div`
  position: fixed;
  bottom: 0.5rem;
  right: 0.5rem;

  > * {
    margin-top: 0.5rem;
  }
`;

const StyledCreateTodoTask = styled(CreateTodoTask)<{ tasksDone: boolean }>`
  visibility: ${({ tasksDone }) => (tasksDone ? "hidden" : "visible")};
`;

export interface IProps
  extends ICreateTodoTaskProps,
    ITopBarProps,
    ITodoTasksProps,
    IDoneTasksProps {}

export const Home = ({
  completeTodoTask,
  createTodoTask,
  currentProject,
  doneTasks,
  listMoreDoneTasks,
  projects,
  signOut,
  todoTasks,
  updateTodoTask
}: IProps) => {
  const [tasksDone, setTasksDone] = useState(false);

  return (
    <Container>
      <TopBar
        currentProject={currentProject}
        projects={projects}
        signOut={signOut}
      />
      <TasksContainer>
        {tasksDone ? (
          <DoneTasks
            doneTasks={doneTasks}
            listMoreDoneTasks={listMoreDoneTasks}
          />
        ) : (
          <TodoTasks
            completeTodoTask={completeTodoTask}
            todoTasks={todoTasks}
            updateTodoTask={updateTodoTask}
          />
        )}
      </TasksContainer>
      <ButtonsContainer>
        <ToggleTasks setTasksDone={setTasksDone} tasksDone={tasksDone} />
        <StyledCreateTodoTask
          createTodoTask={createTodoTask}
          tasksDone={tasksDone}
        />
      </ButtonsContainer>
    </Container>
  );
};
