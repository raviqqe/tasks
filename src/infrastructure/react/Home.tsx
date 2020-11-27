import { useState } from "react";
import styled from "styled-components";
import {
  CreateTodoTask,
  IProps as ICreateTodoTaskProps,
} from "./CreateTodoTask";
import { DoneTasks, IProps as IDoneTasksProps } from "./DoneTasks";
import { TodoTasks, IProps as ITodoTasksProps } from "./TodoTasks";
import { ToggleTasks } from "./ToggleTasks";
import { TopBar, IProps as ITopBarProps } from "./TopBar";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  margin: auto;
`;

const TasksContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70ex;
  max-width: 100%;
  flex: 1;
  overflow: hidden;

  > * {
    flex: 1;
  }
`;

const ButtonsContainer = styled.div`
  position: fixed;
  bottom: 0.5rem;
  right: 0.5rem;

  > * {
    margin-top: 0.5rem;
  }
`;

const StyledCreateTodoTask = styled(CreateTodoTask)<{ tasksDone: boolean }>`
  visibility: ${({ tasksDone }) => (tasksDone ? "hidden" : "visible")};
`;

export interface IProps
  extends ICreateTodoTaskProps,
    ITopBarProps,
    ITodoTasksProps,
    IDoneTasksProps {}

export const Home = ({
  completeTodoTask,
  createTodoTask,
  currentProject,
  doneTasks,
  listMoreDoneTasks,
  reorderTodoTasks,
  signOut,
  showProjects,
  todoTasks,
  updateTodoTask,
}: IProps) => {
  const [tasksDone, setTasksDone] = useState(false);

  return (
    <Container>
      <TopBar
        currentProject={currentProject}
        showProjects={showProjects}
        signOut={signOut}
      />
      <TasksContainer>
        {tasksDone ? (
          <DoneTasks
            doneTasks={doneTasks}
            listMoreDoneTasks={listMoreDoneTasks}
          />
        ) : (
          <TodoTasks
            completeTodoTask={completeTodoTask}
            reorderTodoTasks={reorderTodoTasks}
            todoTasks={todoTasks}
            updateTodoTask={updateTodoTask}
          />
        )}
      </TasksContainer>
      <ButtonsContainer>
        <ToggleTasks setTasksDone={setTasksDone} tasksDone={tasksDone} />
        <StyledCreateTodoTask
          createTodoTask={createTodoTask}
          tasksDone={tasksDone}
        />
      </ButtonsContainer>
    </Container>
  );
};
