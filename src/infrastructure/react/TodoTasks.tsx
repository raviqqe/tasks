import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import styled from "styled-components";
import { ITask } from "../../domain/task";
import { Loader } from "./Loader";
import { Task } from "./Task";
import { buttonMargin } from "./style";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

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
  padding: 1em 0.5em ${buttonMargin};

  > * {
    margin: 0.5em;
  }
`;

export interface IProps {
  completeTodoTask: (task: ITask) => Promise<void>;
  reorderTodoTasks: (taskIds: string[]) => Promise<void>;
  todoTasks: ITask[] | null;
  updateTodoTask: (task: ITask) => Promise<void>;
}

export const TodoTasks = ({
  completeTodoTask,
  reorderTodoTasks,
  todoTasks,
  updateTodoTask,
}: IProps): JSX.Element => {
  const sensors = useSensors(useSensor(PointerSensor));

  return todoTasks ? (
    <DndContext
      collisionDetection={closestCenter}
      sensors={sensors}
      onDragEnd={async ({ active, over }) => {
        if (!over || active.id === over.id) {
          return;
        }

        const taskIds = todoTasks.map((task) => task.id);

        await reorderTodoTasks(
          arrayMove(
            taskIds,
            taskIds.indexOf(active.id),
            taskIds.indexOf(over.id)
          )
        );
      }}
    >
      <SortableContext items={todoTasks} strategy={verticalListSortingStrategy}>
        <Container>
          <Tasks>
            {todoTasks.map((task) => (
              <Task
                completeTask={completeTodoTask}
                dragHandleEnabled={true}
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
