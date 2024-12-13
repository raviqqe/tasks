import { MdExitToApp } from "react-icons/md";
import { white } from "../style.js";
import { IconButton } from "./IconButton.js";

interface Props {
  signOut: () => void;
}

export const SignOut = ({ signOut }: Props): JSX.Element => (
  <IconButton style={{ color: white, fontSize: "1.6rem" }} onClick={signOut}>
    <MdExitToApp />
  </IconButton>
);
