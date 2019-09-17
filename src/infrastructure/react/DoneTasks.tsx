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
  doneTasks: ITask[] | null;
  listDoneTasks: () => Promise<void>;
  listMoreDoneTasks: () => Promise<void>;
}

export const Tasks = ({
  doneTasks,
  listDoneTasks,
  listMoreDoneTasks
}: IProps) => {
  useAsync(listDoneTasks, []);

  return doneTasks ? (
    <Container>
      <StyledInfiniteScroller
        hasMore={true}
        loadMore={listMoreDoneTasks}
        threshold={512}
        useWindow={false}
      >
        {doneTasks.map((task: ITask) => (
          <StyledTask key={task.id} task={task} />
        ))}
      </StyledInfiniteScroller>
    </Container>
  ) : (
    <LoaderContainer>
      <PulseLoader color="white" />
    </LoaderContainer>
  );
};
