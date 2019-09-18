import React from "react";
import styled from "styled-components";
import {
  CreateTodoTask,
  IProps as ICreateTodoTaskProps
} from "./CreateTodoTask";
import { TodoTasks, IProps as ITodoTasksProps } from "./TodoTasks";
import { TopBar, IProps as ITopBarProps } from "./TopBar";

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

const ButtonsContainer = styled.div`
  position: fixed;
  bottom: 0.5rem;
  right: 0.5rem;

  > * {
    margin-top: 0.5rem;
  }
`;

export interface IProps
  extends ICreateTodoTaskProps,
    ITopBarProps,
    ITodoTasksProps {}

export const Home = ({
  completeTodoTask,
  createTodoTask,
  currentProject,
  projects,
  signOut,
  todoTasks,
  updateTodoTask
}: IProps) => (
  <Container>
    <TopBar
      currentProject={currentProject}
      projects={projects}
      signOut={signOut}
    />
    <TodoTasks
      completeTodoTask={completeTodoTask}
      todoTasks={todoTasks}
      updateTodoTask={updateTodoTask}
    />
    <ButtonsContainer>
      <CreateTodoTask createTodoTask={createTodoTask} />
    </ButtonsContainer>
  </Container>
);
