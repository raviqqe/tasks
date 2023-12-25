import defaultUseInfiniteScroll from "react-infinite-scroll-hook";
import { styled } from "@linaria/react";
import type * as domain from "../../domain.js";
import { Loader } from "./Loader.js";
import { Task } from "./Task.js";
import { defaultImport } from "default-import";
import { useEffect, useState } from "react";
import { usePrevious } from "react-use";

const useInfiniteScroll = defaultImport(defaultUseInfiniteScroll);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding: 1em 0.5em;
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
}: Props): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const [ref] = useInfiniteScroll({
    hasNextPage: !done,
    loading,
    onLoadMore: async () => {
      setLoading(true);
      await listMoreDoneTasks();
      setLoading(false);
    },
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
        <DoneTask key={task.id} task={task} />
      ))}
      <LoaderContainer ref={ref}>
        <Loader />
      </LoaderContainer>
    </Container>
  );
};
