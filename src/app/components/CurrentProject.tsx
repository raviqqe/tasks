import { useStore } from "@nanostores/react";
import type { JSX } from "react";
import { useNavigate } from "react-router";
import { projectPresenter } from "../../main/project-presenter.js";
import styles from "./CurrentProject.module.css";
import { Loader } from "./Loader.js";

export const CurrentProject = (): JSX.Element => {
  const project = useStore(projectPresenter.currentProject);
  const navigate = useNavigate();

  return (
    <button
      className={styles.root}
      onClick={() => navigate("/projects")}
      type="button"
    >
      {project?.name ?? <Loader />}
    </button>
  );
};
