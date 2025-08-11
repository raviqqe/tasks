import classNames from "classnames/bind";
import { forwardRef, type JSX, type Ref } from "react";
import type * as domain from "../../domain.js";
import styles from "./Project.module.css";

const classes = classNames.bind(styles);

interface Props {
  buttons?: JSX.Element;
  currentProject?: domain.Project;
  onClick?: () => Promise<void>;
  project: domain.Project;
}

export const Project = forwardRef(
  (
    { buttons, currentProject, onClick, project }: Props,
    ref: Ref<HTMLDivElement>,
  ): JSX.Element => (
    <div className={styles.root} ref={ref}>
      {/* biome-ignore lint/a11y/noStaticElementInteractions: TODO */}
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: TODO */}
      <div
        className={classes("name", {
          clickable: onClick,
          highlighted: project.id === currentProject?.id,
        })}
        onClick={onClick}
      >
        {project.name}
      </div>
      <div className={styles.buttons}>{buttons}</div>
    </div>
  ),
);
Project.displayName = "Project";
