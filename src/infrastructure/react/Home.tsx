import { useState } from "react";
import { useAsync } from "react-use";
import styled from "styled-components";
import {
  CreateTodoTask,
  IProps as ICreateTodoTaskProps,
} from "./CreateTodoTask.js";
import { DoneTasks, IProps as IDoneTasksProps } from "./DoneTasks.js";
import { TodoTasks, IProps as ITodoTasksProps } from "./TodoTasks.js";
import { ToggleTasks } from "./ToggleTasks.js";
import { TopBar, IProps as ITopBarProps } from "./TopBar.js";

const Container = styled.default.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  margin: auto;
`;

const TasksContainer = styled.default.div`
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

const ButtonsContainer = styled.default.div`
  position: fixed;
  bottom: 0.5rem;
  right: 0.5rem;

  > * {
    margin-top: 0.5rem;
  }
`;

const StyledCreateTodoTask = styled.default(CreateTodoTask)<{
  tasksDone: boolean;
}>`
  visibility: ${({ tasksDone }) => (tasksDone ? "hidden" : "visible")};
`;

export interface IProps
  extends ICreateTodoTaskProps,
    ITopBarProps,
    ITodoTasksProps,
    IDoneTasksProps {
  initializeCurrentProject: () => Promise<void>;
}

export const Home = ({
  completeTodoTask,
  createTodoTask,
  currentProject,
  doneTasks,
  initializeCurrentProject,
  listMoreDoneTasks,
  reorderTodoTasks,
  signOut,
  showProjects,
  todoTasks,
  updateTodoTask,
}: IProps): JSX.Element => {
  useAsync(initializeCurrentProject, []);
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
