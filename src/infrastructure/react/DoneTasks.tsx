import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import { defaultImport } from "default-import";
import defaultInfiniteScroll from "react-infinite-scroll-component";
import type * as domain from "../../domain.js";
import { Loader } from "./Loader.js";
import { Task } from "./Task.js";

const InfiniteScroll = defaultImport(defaultInfiniteScroll);

const doneTasksContainerId = "done-tasks-container";

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

const DoneTask = styled(Task)`
  margin: 0.5em;
`;

export interface Props {
  doneTasks: domain.Task[] | null;
  listMoreDoneTasks: () => Promise<void>;
}

export const DoneTasks = ({
  doneTasks,
  listMoreDoneTasks,
}: Props): JSX.Element =>
  doneTasks ? (
    <Container id={doneTasksContainerId}>
      <InfiniteScroll
        className={css`
          display: flex;
          flex-direction: column;
          padding: 1em 0.5em;
        `}
        dataLength={doneTasks.length}
        hasMore
        loader={null}
        next={listMoreDoneTasks}
        scrollableTarget={doneTasksContainerId}
      >
        {doneTasks.map((task) => (
          <DoneTask key={task.id} task={task} />
        ))}
      </InfiniteScroll>
    </Container>
  ) : (
    <LoaderContainer>
      <Loader />
    </LoaderContainer>
  );
