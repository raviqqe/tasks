
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import styled from "styled-components";
import { ITask } from "../../domain/task";
import { Loader } from "./Loader";
import { Task } from "./Task";
import { buttonMargin } from "./style";

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

const Tasks = SortableContainer(styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em 0.5em ${buttonMargin};

  > * {
    margin: 0.5em;
  }
`);

const SortableTask = SortableElement(Task);

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
}: IProps): JSX.Element =>
  todoTasks ? (
    <Container>
      <Tasks
        onSortEnd={async ({ oldIndex, newIndex }) => {
          const taskIds = todoTasks.map((task) => task.id);
          const [taskId] = taskIds.splice(oldIndex, 1);

          if (!taskId) {
            throw new Error(`task not found at index: ${oldIndex}`);
          }

          taskIds.splice(newIndex, 0, taskId);
          await reorderTodoTasks(taskIds);
        }}
        useDragHandle={true}
      >
        {todoTasks.map((task: ITask, index: number) => (
          <SortableTask
            completeTask={completeTodoTask}
            dragHandleEnabled={true}
            index={index}
            key={task.id}
            task={task}
            updateTask={updateTodoTask}
          />
        ))}
      </Tasks>
    </Container>
  ) : (
    <LoaderContainer>
      <Loader />
    </LoaderContainer>
  );
