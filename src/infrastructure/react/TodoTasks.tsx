import { PulseLoader } from "react-spinners";
import { useAsync } from "react-use";
import React from "react";
import styled from "styled-components";
import { ITask } from "../../domain/task";
import { Task } from "./Task";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Tasks = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em 0.5em;
`;

const StyledTask = styled(Task)`
  margin: 0.5em;
`;

export interface IProps {
  todoTasks: ITask[] | null;
  listTodoTasks: () => Promise<void>;
  updateTodoTask: (task: ITask) => Promise<void>;
}

export const TodoTasks = ({
  todoTasks,
  listTodoTasks,
  updateTodoTask
}: IProps) => {
  useAsync(listTodoTasks, []);

  return todoTasks ? (
    <Container>
      <Tasks>
        {todoTasks.map((task: ITask) => (
          <StyledTask key={task.id} task={task} updateTask={updateTodoTask} />
        ))}
      </Tasks>
    </Container>
  ) : (
    <LoaderContainer>
      <PulseLoader color="white" />
    </LoaderContainer>
  );
};
