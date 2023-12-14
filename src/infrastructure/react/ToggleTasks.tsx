import { FaRegCheckSquare, FaRegSquare } from "react-icons/fa/index.js";
import { CircleButton } from "./CircleButton.js";

interface Props {
  setTasksDone: (done: boolean) => void;
  tasksDone: boolean;
}

export const ToggleTasks = ({
  setTasksDone,
  tasksDone,
}: Props): JSX.Element => (
  <CircleButton
    aria-label="Toggle Tasks"
    onClick={() => setTasksDone(!tasksDone)}
    secondary
  >
    {tasksDone ? <FaRegCheckSquare /> : <FaRegSquare />}
  </CircleButton>
);
