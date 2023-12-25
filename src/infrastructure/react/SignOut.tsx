import { MdExitToApp } from "react-icons/md/index.js";
import { styled } from "@linaria/react";
import { IconButton } from "./IconButton.js";
import { white } from "./style/colors.js";

const StyledIconButton = styled(IconButton)`
  color: ${white};
  font-size: 1.6rem;
`;

export interface Props {
  signOut: () => void;
}

export const SignOut = ({ signOut }: Props): JSX.Element => (
  <StyledIconButton onClick={signOut}>
    <MdExitToApp />
  </StyledIconButton>
);
