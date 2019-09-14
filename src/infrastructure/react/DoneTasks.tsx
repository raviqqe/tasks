import { PulseLoader } from "react-spinners";
import InfiniteScroller from "react-infinite-scroller";
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

const StyledInfiniteScroller = styled(InfiniteScroller)`
  display: flex;
  flex-direction: column;
  padding: 1em 0.5em;
`;

const StyledTask = styled(Task)`
  margin: 0.5em;
`;

export interface IProps {
  tasks: ITask[] | null;
  listTasks: () => Promise<void>;
  listMoreTasks: () => Promise<void>;
  updateTask: (task: ITask, text: string) => Promise<void>;
}

export const Tasks = ({
  tasks,
  listTasks,
  listMoreTasks,
  updateTask
}: IProps) => {
  useAsync(listTasks, []);

  return tasks ? (
    <Container>
      <StyledInfiniteScroller
        hasMore={true}
        loadMore={listMoreTasks}
        threshold={512}
        useWindow={false}
      >
        {tasks.map((task: ITask) => (
          <StyledTask key={task.id} task={task} updateTask={updateTask} />
        ))}
      </StyledInfiniteScroller>
    </Container>
  ) : (
    <LoaderContainer>
      <PulseLoader color="white" />
    </LoaderContainer>
  );
};
