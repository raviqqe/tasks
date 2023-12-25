import { MdAdd } from "react-icons/md/index.js";
import { CircleButton } from "./CircleButton.js";

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

      await createTodoTask(name);
    }}
    {...restProps}
  >
    <MdAdd />
  </CircleButton>
);
