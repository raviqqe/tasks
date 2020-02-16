import React from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import styled from "styled-components";
import { ITask } from "../../domain/task";
import { Task } from "./Task";
import { Loader } from "./Loader";
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
  updateTodoTask
}: IProps) =>
  todoTasks ? (
    <Container>
      <Tasks
        onSortEnd={async ({ oldIndex, newIndex }) => {
          const taskIds = todoTasks.map(task => task.id);
          taskIds.splice(newIndex, 0, taskIds.splice(oldIndex, 1)[0]);
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
