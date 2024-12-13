import { styled } from "@linaria/react";
import { useStore } from "@nanostores/react";
import { useAsync, useInfiniteScroll, usePrevious } from "@raviqqe/react-hooks";
import { useCallback, useEffect, useState } from "react";
import { doneTaskLister } from "../../main/done-task-lister.js";
import { doneTaskPresenter } from "../../main/done-task-presenter.js";
import { Loader } from "./Loader.js";
import { Task } from "./Task.js";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: auto;
  padding: 1rem;
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DoneTaskList = (): JSX.Element => {
  const tasks = useStore(doneTaskPresenter.tasks);
  const [done, setDone] = useState(false);

  useAsync(() => doneTaskLister.list(), []);

  const listMore = useCallback(async () => {
    await doneTaskLister.listMore();
    setDone(true);
  }, [tasks]);
  const ref = useInfiniteScroll<HTMLDivElement>(listMore);

  return (
    <Container>
      {tasks?.map((task) => <Task key={task.id} task={task} />)}
      {!done && (
        <LoaderContainer ref={ref}>
          <Loader />
        </LoaderContainer>
      )}
    </Container>
  );
};
