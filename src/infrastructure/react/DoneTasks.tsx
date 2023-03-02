import { defaultImport } from "default-import";
import defaultInfiniteScroll, {
  type Props,
} from "react-infinite-scroll-component";
import defaultStyled from "styled-components";
import { type ITask } from "../../domain/task.js";
import { Loader } from "./Loader.js";
import { Task } from "./Task.js";

const styled = defaultImport(defaultStyled);
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
