import type { DraggableSyntheticListeners } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import classNames from "classnames";
import type { JSX } from "react";
import { MdCheck, MdDragHandle, MdEdit } from "react-icons/md";
import type * as domain from "../../domain.js";
import { todoTaskCompleter } from "../../main/todo-task-completer.js";
import { todoTaskUpdater } from "../../main/todo-task-updater.js";
import { IconButton } from "./IconButton.js";
import styles from "./Task.module.css";

// biome-ignore lint/style/useNamingConvention: Correct spelling
const maxZIndex = 10000;

const DragHandle = (props: DraggableSyntheticListeners) => (
  <IconButton
    className={styles.dragHandle}
    onClick={() => undefined}
    {...props}
  >
    <MdDragHandle />
  </IconButton>
);

interface Props {
  className?: string;
  editable?: boolean;
  task: domain.Task;
}

export const Task = ({
  editable,
  task,
  className,
  ...restProps
}: Props): JSX.Element => {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable(task);

  return (
    <div
      {...restProps}
      className={classNames(styles.root, className)}
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform && { ...transform, x: 0 }),
        transition,
        zIndex: isDragging ? maxZIndex : undefined,
      }}
      {...attributes}
    >
      <div className={styles.name}>{task.name}</div>
      <div className={styles.buttons}>
        {editable && (
          <>
            <IconButton
              aria-label="Done"
              onClick={() => todoTaskCompleter.complete(task)}
            >
              <MdCheck />
            </IconButton>
            <IconButton
              aria-label="Edit"
              onClick={async () => {
                const name = window.prompt("New task name?", task.name);

                if (name === null) {
                  return;
                }

                await todoTaskUpdater.update({ ...task, name });
              }}
            >
              <MdEdit />
            </IconButton>
            <DragHandle {...listeners} />
          </>
        )}
      </div>
    </div>
  );
};
