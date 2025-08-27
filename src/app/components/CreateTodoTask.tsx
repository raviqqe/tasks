import type { JSX } from "react";
import { MdAdd } from "react-icons/md";
import { todoTaskCreator } from "../../main/todo-task-creator.js";
import { CircleButton } from "./CircleButton.js";

interface Props {
  className?: string;
}

export const CreateTodoTask = (props: Props): JSX.Element => (
  <CircleButton
    aria-label="Create"
    onClick={async () => {
      const name = window.prompt("Task name?");

      if (!name) {
        return;
      }

      await todoTaskCreator.create(name);
    }}
    {...props}
  >
    <MdAdd />
  </CircleButton>
);
