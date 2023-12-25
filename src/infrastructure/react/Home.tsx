import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import { useState } from "react";
import { useAsync } from "react-use";
import {
  CreateTodoTask,
  type Props as CreateTodoTaskProps,
} from "./CreateTodoTask.js";
import { DoneTasks, type Props as DoneTasksProps } from "./DoneTaskList.js";
import { TodoTasks, type Props as TodoTasksProps } from "./TodoTaskList.js";
import { ToggleTasks } from "./ToggleTasks.js";
import { TopBar, type Props as TopBarProps } from "./TopBar.js";

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

export interface Props
  extends CreateTodoTaskProps,
    TopBarProps,
    TodoTasksProps,
    DoneTasksProps {
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
}: Props): JSX.Element => {
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
        <CreateTodoTask
          className={
            tasksDone
              ? css`
                  visibility: hidden;
                `
              : undefined
          }
          createTodoTask={createTodoTask}
        />
      </ButtonsContainer>
    </Container>
  );
};
