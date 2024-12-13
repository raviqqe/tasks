import { FaRegCheckSquare, FaRegSquare } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router";
import { CircleButton } from "./CircleButton.js";

export const ToggleTasks = (): JSX.Element => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const done = pathname === "/tasks/done";

  return (
    <CircleButton
      aria-label="Toggle Tasks"
      onClick={() => navigate(done ? "/tasks" : "/tasks/done")}
      secondary
    >
      {done ? <FaRegCheckSquare /> : <FaRegSquare />}
    </CircleButton>
  );
};
