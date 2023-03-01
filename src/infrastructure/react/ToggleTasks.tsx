import { FaRegCheckSquare, FaRegSquare } from "react-icons/fa/index.js";
import { CircleButton } from "./CircleButton";

interface IProps {
  setTasksDone: (done: boolean) => void;
  tasksDone: boolean;
}

export const ToggleTasks = ({
  setTasksDone,
  tasksDone,
}: IProps): JSX.Element => (
  <CircleButton
    aria-label="Toggle Tasks"
    onClick={() => setTasksDone(!tasksDone)}
    secondary={true}
  >
    {tasksDone ? <FaRegCheckSquare /> : <FaRegSquare />}
  </CircleButton>
);
