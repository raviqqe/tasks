import { MdExitToApp } from "react-icons/md";
import React from "react";
import { IconButton } from "./IconButton";

export interface IProps {
  signOut: () => void;
}

export const SignOut = ({ signOut, ...restProps }: IProps) => (
  <IconButton onClick={signOut} {...restProps}>
    <MdExitToApp />
  </IconButton>
);
