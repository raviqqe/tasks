import React from "react";
import styled from "styled-components";
import {
  CreateTodoTask,
  IProps as ICreateTodoTaskProps
} from "./CreateTodoTask";
import { TodoTasks, IProps as ITodoTasksProps } from "./TodoTasks";
import { Project, IProps as IProjectProps } from "./Project";
import { SignOut } from "./SignOut";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 70ex;
  max-width: 100%;
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
    IProjectProps,
    ITodoTasksProps {
  signOut: () => void;
}

export const Home = ({
  createTodoTask,
  currentProject,
  projects,
  signOut,
  todoTasks,
  updateTodoTask
}: IProps) => (
  <Container>
    <Project currentProject={currentProject} projects={projects} />
    <TodoTasks todoTasks={todoTasks} updateTodoTask={updateTodoTask} />
    <ButtonsContainer>
      <SignOut signOut={signOut} />
      <CreateTodoTask createTodoTask={createTodoTask} />
    </ButtonsContainer>
  </Container>
);
