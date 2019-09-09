import React from "react";
import styled from "styled-components";
import { CreateTask } from "./CreateTask";
import { Tasks, IProps as ITasksProps } from "./Tasks";
import { SignOut } from "./SignOut";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 85ex;
  max-width: 100%;
  margin: auto;

  > :first-child {
    flex: 1;
  }
`;

const ButtonsContainer = styled.div`
  position: fixed;
  top: 0.5rem;
  right: 0.5rem;

  > * {
    margin-bottom: 0.5rem;
  }
`;

export interface IProps extends ITasksProps {
  createTask: (text: string) => Promise<void>;
  signOut: () => void;
}

export const Home = ({
  createTask,
  tasks,
  listTasks,
  listMoreTasks,
  signOut,
  updateTask
}: IProps) => (
  <Container>
    <Tasks
      tasks={tasks}
      listTasks={listTasks}
      listMoreTasks={listMoreTasks}
      updateTask={updateTask}
    />
    <ButtonsContainer>
      <SignOut signOut={signOut} />
      <CreateTask createTask={createTask} />
    </ButtonsContainer>
  </Container>
);
