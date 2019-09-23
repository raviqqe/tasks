import { MdArchive } from "react-icons/md";
import React from "react";
import { CircleButton } from "./CircleButton";

export interface IProps {
  showArchivedProjects: () => void;
}

export const ShowArchivedProjects = ({ showArchivedProjects }: IProps) => (
  <CircleButton
    aria-label="Show Archived Projects"
    onClick={showArchivedProjects}
    secondary
  >
    <MdArchive />
  </CircleButton>
);
