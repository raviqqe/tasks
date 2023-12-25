import { defaultImport } from "default-import";
import defaultInfiniteScroll, {
  type Props as ScrollProps,
} from "react-infinite-scroll-component";
import { styled } from "@linaria/react";
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

const StyledInfiniteScroll = styled((props: ScrollProps) => (
  <InfiniteScroll {...props} />
))`
  display: flex;
  flex-direction: column;
  padding: 1em 0.5em;
`;

const StyledTask = styled(Task)`
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
      <StyledInfiniteScroll
        dataLength={doneTasks.length}
        hasMore
        loader={null}
        next={listMoreDoneTasks}
        scrollableTarget={doneTasksContainerId}
      >
        {doneTasks.map((task) => (
          <StyledTask key={task.id} task={task} />
        ))}
      </StyledInfiniteScroll>
    </Container>
  ) : (
    <LoaderContainer>
      <Loader />
    </LoaderContainer>
  );
