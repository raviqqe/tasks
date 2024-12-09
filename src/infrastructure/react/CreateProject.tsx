import { MdAdd } from "react-icons/md";
import { CircleButton } from "./CircleButton.js";

export interface Props {
  className?: string;
  onCreate: (name: string) => Promise<void>;
}

export const CreateProject = ({
  onCreate: createProject,
  ...restProps
}: Props): JSX.Element => (
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
