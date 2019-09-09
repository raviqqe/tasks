import { MdAdd } from "react-icons/md";
import React from "react";
import { CircleButton } from "./CircleButton";

interface IProps {
  createTask: (name: string) => Promise<void>;
}

export const CreateTask = ({ createTask }: IProps) => {
  return (
    <CircleButton
      aria-label="Create"
      onClick={async () => {
        const name = window.prompt("Task name?");

        if (!name) {
          return;
        }

        await createTask(name);
      }}
    >
      <MdAdd />
    </CircleButton>
  );
};
