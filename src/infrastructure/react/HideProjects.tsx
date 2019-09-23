import { MdClose } from "react-icons/md";
import React from "react";
import { CircleButton } from "./CircleButton";

export interface IProps {
  hideProjects: () => void;
}

export const HideProjects = ({ hideProjects }: IProps) => (
  <CircleButton aria-label="Hide Projects" onClick={hideProjects} secondary>
    <MdClose />
  </CircleButton>
);
