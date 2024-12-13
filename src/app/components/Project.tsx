import { type JSX, forwardRef, type Ref } from "react";
import type * as domain from "../../domain.js";
import styles from "./Project.module.css";
import classNames from "classnames/bind";

const classes = classNames.bind(styles);

interface Props {
  buttons?: JSX.Element;
  currentProject?: domain.Project;
  project: domain.Project;
  onClick?: () => Promise<void>;
}

export const Project = forwardRef(
  (
    { buttons, currentProject, onClick, project }: Props,
    ref: Ref<HTMLDivElement>,
  ): JSX.Element => {
    return (
      <div className={styles.container} ref={ref}>
        <div
          className={classes("name", {
            clickable: !!onClick,
            highlighted: project.id === currentProject?.id,
          })}
          onClick={onClick}
        >
          {project.name}
        </div>
        <div className={styles.buttons}>{buttons}</div>
      </div>
    );
  },
);
Project.displayName = "Project";
