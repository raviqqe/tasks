import InfiniteScroller from "react-infinite-scroller";
import React from "react";
import styled from "styled-components";
import { ITask } from "../../domain/task";
import { Task } from "./Task";
import { Loader } from "./Loader";

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
  listMoreDoneTasks: () => Promise<void>;
}

export const DoneTasks = ({ doneTasks, listMoreDoneTasks }: IProps) =>
  doneTasks ? (
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
      <Loader />
    </LoaderContainer>
  );
