import { MdCheck, MdEdit } from "react-icons/md";
import React from "react";
import styled from "styled-components";
import { ITask } from "../../domain/task";
import { IconButton } from "./IconButton";
import { boxShadow } from "./style";

const Container = styled.div`
  ${boxShadow};
  display: flex;
  justify-content: space-between
  align-items: center;
  background: white;
  padding: 0.8em;
  border-radius: 0.5em;
`;

const Name = styled.div`
  word-break: break-word;
  margin-right: 0.5ex;
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;

  > :not(:first-child) {
    margin-left: 0.25rem;
  }
`;

interface IProps {
  completeTask?: (task: ITask) => Promise<void>;
  task: ITask;
  updateTask?: (task: ITask) => Promise<void>;
}

export const Task = ({
  completeTask,
  task,
  updateTask,
  ...restProps
}: IProps) => (
  <Container {...restProps}>
    <Name>{task.name}</Name>
    <ButtonsContainer>
      {completeTask && (
        <IconButton aria-label="Done" onClick={() => completeTask(task)}>
          <MdCheck />
        </IconButton>
      )}
      {updateTask && (
        <IconButton
          aria-label="Edit"
          onClick={async () => {
            const name = window.prompt("New task name?", task.name);

            if (!name) {
              return;
            }

            await updateTask({ ...task, name });
          }}
        >
          <MdEdit />
        </IconButton>
      )}
    </ButtonsContainer>
  </Container>
);
