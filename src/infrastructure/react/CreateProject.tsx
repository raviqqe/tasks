import { MdAdd } from "react-icons/md";
import React from "react";
import { CircleButton } from "./CircleButton";

export interface IProps {
  createProject: (name: string) => Promise<void>;
}

export const CreateProject = ({ createProject }: IProps) => (
  <CircleButton
    aria-label="Create Project"
    onClick={async () => {
      const name = window.prompt("Project name?");

      if (!name) {
        return;
      }

      await createProject(name);
    }}
  >
    <MdAdd />
  </CircleButton>
);
