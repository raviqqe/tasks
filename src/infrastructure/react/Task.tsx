import { MdEdit } from "react-icons/md";
import React from "react";
import styled from "styled-components";
import { ITask } from "../../domain/task";
import { IconButton } from "./IconButton";
import { boxShadow } from "./style";

const Container = styled.div`
  ${boxShadow};
  background: white;
  padding: 1em;
  padding-right: 2.1em;
  border-radius: 0.5em;
  position: relative;
`;

const Name = styled.div``;

const ButtonContainer = styled.div`
  display: flex;
  position: absolute;
  top: 0.4em;
  right: 0.4em;
`;

interface IProps {
  task: ITask;
  updateTask: (task: ITask, text: string) => Promise<void>;
}

export const Task = ({ task, updateTask, ...restProps }: IProps) => (
  <Container {...restProps}>
    <Name>{task.name}</Name>
    <ButtonContainer>
      <IconButton
        aria-label="Edit"
        onClick={async () => {
          const name = window.prompt("New task name?", task.name);

          if (!name) {
            return;
          }

          await updateTask(task, name);
        }}
      >
        <MdEdit />
      </IconButton>
    </ButtonContainer>
  </Container>
);
