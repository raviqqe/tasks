import type { JSX } from "react";
import { MdAdd } from "react-icons/md";
import { CircleButton } from "./CircleButton.js";

interface Props {
  className?: string;
  onCreate: (name: string) => Promise<void>;
}

export const CreateProject = ({ onCreate, ...rest }: Props): JSX.Element => (
  <CircleButton
    aria-label="Create Project"
    onClick={async () => {
      const name = window.prompt("Project name?");

      if (!name) {
        return;
      }

      await onCreate(name);
    }}
    {...rest}
  >
    <MdAdd />
  </CircleButton>
);
