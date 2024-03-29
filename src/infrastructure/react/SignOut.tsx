import { styled } from "@linaria/react";
import { MdExitToApp } from "react-icons/md";
import { IconButton } from "./IconButton.js";
import { white } from "./style/colors.js";

const SignOutIconButton = styled(IconButton)`
  color: ${white};
  font-size: 1.6rem;
`;

export interface Props {
  signOut: () => void;
}

export const SignOut = ({ signOut }: Props): JSX.Element => (
  <SignOutIconButton onClick={signOut}>
    <MdExitToApp />
  </SignOutIconButton>
);
