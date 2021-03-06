import { MdAdd } from "react-icons/md";
import { CircleButton } from "./CircleButton";

export interface IProps {
  createProject: (name: string) => Promise<void>;
}

export const CreateProject = ({
  createProject,
  ...restProps
}: IProps): JSX.Element => (
  <CircleButton
    aria-label="Create Project"
    onClick={async () => {
      const name = window.prompt("Project name?");

      if (!name) {
        return;
      }

      await createProject(name);
    }}
    {...restProps}
  >
    <MdAdd />
  </CircleButton>
);
