import { useAsync } from "@raviqqe/react-hooks";
import type { JSX } from "react";
import { Outlet, useLocation } from "react-router";
import { currentProjectInitializer } from "../../../main/current-project-initializer.js";
import { CreateTodoTask } from "../../components/CreateTodoTask.js";
import { ToggleTasks } from "../../components/ToggleTasks.js";
import { TopBar } from "../../components/TopBar.js";
import styles from "./route.module.css";

export default (): JSX.Element => {
  useAsync(() => currentProjectInitializer.initialize(), []);
  const { pathname } = useLocation();

  return (
    <div className={styles.root}>
      <TopBar />
      <div className={styles.tasks}>
        <Outlet />
      </div>
      <div className={styles.buttons}>
        <ToggleTasks />
        <CreateTodoTask
          className={pathname === "/tasks/done" ? styles.hidden : undefined}
        />
      </div>
    </div>
  );
};
