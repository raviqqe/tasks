import type { JSX } from "react";
import { MdExitToApp } from "react-icons/md";
import { IconButton } from "./IconButton.js";

interface Props {
  signOut: () => void;
}

export const SignOut = ({ signOut }: Props): JSX.Element => (
  <IconButton
    onClick={signOut}
    style={{ color: "var(--white)", fontSize: "1.6rem" }}
  >
    <MdExitToApp />
  </IconButton>
);
