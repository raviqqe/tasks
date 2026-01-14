import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useStore } from "@nanostores/react";
import { useAsync } from "@raviqqe/react-hooks";
import type { JSX } from "react";
import { todoTaskLister } from "../../../main/todo-task-lister.js";
import { todoTaskPresenter } from "../../../main/todo-task-presenter.js";
import { todoTaskReorderer } from "../../../main/todo-task-reorderer.js";
import { Loader } from "../../components/Loader.js";
import { Task } from "../../components/Task.js";
import styles from "./route.module.css";

export default (): JSX.Element => {
  const todoTasks = useStore(todoTaskPresenter.tasks);
  const sensors = useSensors(useSensor(PointerSensor));

  useAsync(() => todoTaskLister.list(), []);

  return todoTasks ? (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={async ({ active, over }) => {
        if (!over || active.id === over.id) {
          return;
        }

        const taskIds = todoTasks.map((task) => task.id);

        await todoTaskReorderer.reorder(
          arrayMove(
            taskIds,
            taskIds.indexOf(active.id.toString()),
            taskIds.indexOf(over.id.toString()),
          ),
        );
      }}
      sensors={sensors}
    >
      <SortableContext items={todoTasks} strategy={verticalListSortingStrategy}>
        <div className={styles.root}>
          <div className={styles.tasks}>
            {todoTasks.map((task) => (
              <Task editable key={task.id} task={task} />
            ))}
          </div>
        </div>
      </SortableContext>
    </DndContext>
  ) : (
    <div className={styles.loaderContainer}>
      <Loader />
    </div>
  );
};
