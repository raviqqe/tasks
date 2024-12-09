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
import { styled } from "@linaria/react";
import type * as domain from "../../domain.js";
import { todoTaskReorderer } from "../../main/todo-task-reorderer.js";
import { Loader } from "./Loader.js";
import { Task } from "./Task.js";
import { buttonMargin } from "./style.js";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Tasks = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 1rem ${buttonMargin};
  gap: 1rem;
`;

export interface Props {
  todoTasks: domain.Task[] | null;
}

export const TodoTaskList = ({ todoTasks }: Props): JSX.Element => {
  const sensors = useSensors(useSensor(PointerSensor));

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
        <Container>
          <Tasks>
            {todoTasks.map((task) => (
              <Task editable key={task.id} task={task} />
            ))}
          </Tasks>
        </Container>
      </SortableContext>
    </DndContext>
  ) : (
    <LoaderContainer>
      <Loader />
    </LoaderContainer>
  );
};
