import { MdAdd } from "react-icons/md";
import React from "react";
import { CircleButton } from "./CircleButton";

export interface IProps {
  createTodoTask: (name: string) => Promise<void>;
}

export const CreateTodoTask = ({ createTodoTask, ...restProps }: IProps) => (
  <CircleButton
    aria-label="Create"
    onClick={async () => {
      const name = window.prompt("Task name?");

      if (!name) {
        return;
      }

      await createTodoTask(name);
    }}
    {...restProps}
  >
    <MdAdd />
  </CircleButton>
);
