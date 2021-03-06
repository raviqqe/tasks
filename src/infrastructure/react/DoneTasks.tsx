import InfiniteScroll, { Props } from "react-infinite-scroll-component";
import styled from "styled-components";
import { ITask } from "../../domain/task";
import { Loader } from "./Loader";
import { Task } from "./Task";

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

const StyledInfiniteScroll = styled((props: Props) => (
  <InfiniteScroll {...props} />
))`
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

export const DoneTasks = ({
  doneTasks,
  listMoreDoneTasks,
}: IProps): JSX.Element =>
  doneTasks ? (
    <Container id={doneTasksContainerId}>
      <StyledInfiniteScroll
        dataLength={doneTasks.length}
        hasMore={true}
        loader={null}
        next={listMoreDoneTasks}
        scrollableTarget={doneTasksContainerId}
      >
        {doneTasks.map((task: ITask) => (
          <StyledTask key={task.id} task={task} />
        ))}
      </StyledInfiniteScroll>
    </Container>
  ) : (
    <LoaderContainer>
      <Loader />
    </LoaderContainer>
  );
