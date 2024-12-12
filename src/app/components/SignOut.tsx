import { styled } from "@linaria/react";
import { MdExitToApp } from "react-icons/md";
import { white } from "../style.js";
import { IconButton } from "./IconButton.js";

const SignOutIconButton = styled(IconButton)`
  color: ${white};
  font-size: 1.6rem;
`;

interface Props {
  signOut: () => void;
}

export const SignOut = ({ signOut }: Props): JSX.Element => (
  <SignOutIconButton onClick={signOut}>
    <MdExitToApp />
  </SignOutIconButton>
);