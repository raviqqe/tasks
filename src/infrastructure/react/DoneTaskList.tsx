import { styled } from "@linaria/react";
import { sleep } from "@raviqqe/loscore/async";
import { defaultImport } from "default-import";
import { useCallback, useEffect, useState } from "react";
import defaultUseInfiniteScroll from "react-infinite-scroll-hook";
import { useAsync, usePrevious } from "react-use";
import type * as domain from "../../domain.js";
import { doneTaskLister } from "../../main/done-task-lister.js";
import { Loader } from "./Loader.js";
import { Task } from "./Task.js";

const useInfiniteScroll = defaultImport(defaultUseInfiniteScroll);

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

export interface Props {
  doneTasks: domain.Task[] | null;
}

export const DoneTaskList = ({ doneTasks }: Props): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const onLoadMore = useCallback(async () => {
    setLoading(true);
    await doneTaskLister.listMore();
    await sleep(0);
    setLoading(false);
  }, [setLoading]);

  useAsync(onLoadMore, []);

  const [ref] = useInfiniteScroll({
    hasNextPage: !done,
    loading,
    onLoadMore,
  });

  const oldLoading = usePrevious(loading);
  const [length, setLength] = useState(0);

  useEffect(() => {
    if (!oldLoading && loading) {
      setLength(doneTasks?.length ?? 0);
    } else if (oldLoading && !loading && doneTasks?.length === length) {
      setDone(true);
    }
  }, [doneTasks, length, loading, oldLoading]);

  return (
    <Container>
      {(doneTasks ?? []).map((task) => (
        <Task key={task.id} task={task} />
      ))}
      {!done && (
        <LoaderContainer ref={ref}>
          <Loader />
        </LoaderContainer>
      )}
    </Container>
  );
};
