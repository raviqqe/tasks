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
import { defaultImport } from "default-import";
import defaultStyled from "styled-components";
import { ITask } from "../../domain/task.js";
import { Loader } from "./Loader.js";
import { Task } from "./Task.js";
import { buttonMargin } from "./style/index.js";

const styled = defaultImport(defaultStyled);

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
      onDragEnd={async ({ active, over }) => {
        if (!over || active.id === over.id) {
          return;
        }

        const taskIds = todoTasks.map((task) => task.id);

        await reorderTodoTasks(
          arrayMove(
            taskIds,
            taskIds.indexOf(active.id.toString()),
            taskIds.indexOf(over.id.toString())
          )
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
