import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { styled } from "@linaria/react";
import type * as domain from "../../domain.js";
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
  completeTodoTask: (task: domain.Task) => Promise<void>;
  reorderTodoTasks: (taskIds: string[]) => Promise<void>;
  todoTasks: domain.Task[] | null;
  updateTodoTask: (task: domain.Task) => Promise<void>;
}

export const TodoTaskList = ({
  completeTodoTask,
  reorderTodoTasks,
  todoTasks,
  updateTodoTask,
}: Props): JSX.Element => {
  const sensors = useSensors(useSensor(PointerSensor));

  return todoTasks ? (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={async ({ active, over }) => {
        if (!over || active.id === over.id) {
          return;
        }

        const taskIds = todoTasks.map((task) => task.id);

        await reorderTodoTasks(
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
              <Task
                completeTask={completeTodoTask}
                dragHandleEnabled
                key={task.id}
                task={task}
                updateTask={updateTodoTask}
              />
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
