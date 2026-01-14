import { useStore } from "@nanostores/react";
import { useAsync, useInfiniteScroll } from "@raviqqe/react-hooks";
import type { JSX } from "react";
import { useCallback, useRef, useState } from "react";
import { doneTaskLister } from "../../../main/done-task-lister.js";
import { doneTaskPresenter } from "../../../main/done-task-presenter.js";
import { Loader } from "../../components/Loader.js";
import { Task } from "../../components/Task.js";
import styles from "./route.module.css";

export default (): JSX.Element => {
  const tasks = useStore(doneTaskPresenter.tasks);
  const [done, setDone] = useState(false);

  useAsync(() => doneTaskLister.list(), []);

  const listMore = useCallback(async () => {
    if (!tasks) {
      return;
    }

    await doneTaskLister.listMore();
    setDone(doneTaskPresenter.tasks.get()?.length === tasks.length);
  }, [tasks]);

  const ref = useRef(null);
  useInfiniteScroll(ref, listMore);

  return (
    <div className={styles.root}>
      {tasks?.map((task) => (
        <Task key={task.id} task={task} />
      ))}
      {!done && (
        <div className={styles.loaderContainer} ref={ref}>
          <Loader />
        </div>
      )}
    </div>
  );
};
