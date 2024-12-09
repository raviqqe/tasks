import { MdAdd } from "react-icons/md";
import { CircleButton } from "./CircleButton.js";
import { todoTaskCreator } from "../../main/todo-task-creator.js";

export interface Props {
  className?: string;
  createTodoTask: (name: string) => Promise<void>;
}

export const CreateTodoTask = ({
  createTodoTask,
  ...restProps
}: Props): JSX.Element => (
  <CircleButton
    aria-label="Create"
    onClick={async () => {
      const name = window.prompt("Task name?");

      if (!name) {
        return;
      }

      await todoTaskCreator.create(name);
    }}
    {...restProps}
  >
    <MdAdd />
  </CircleButton>
);
