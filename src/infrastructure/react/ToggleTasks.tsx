
import { FaRegCheckSquare, FaRegSquare } from "react-icons/fa";
import { CircleButton } from "./CircleButton";

export interface IProps {
  setTasksDone: (done: boolean) => void;
  tasksDone: boolean;
}

export const ToggleTasks = ({ setTasksDone, tasksDone }: IProps) => (
  <CircleButton
    aria-label="Toggle Tasks"
    onClick={() => setTasksDone(!tasksDone)}
    secondary={true}
  >
    {tasksDone ? <FaRegCheckSquare /> : <FaRegSquare />}
  </CircleButton>
);
