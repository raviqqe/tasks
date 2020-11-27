
import { MdExitToApp } from "react-icons/md";
import styled from "styled-components";
import { IconButton } from "./IconButton";
import { white } from "./style/colors";

const StyledIconButton = styled(IconButton)`
  color: ${white};
  font-size: 1.6rem;
`;

export interface IProps {
  signOut: () => void;
}

export const SignOut = ({ signOut }: IProps) => (
  <StyledIconButton onClick={signOut}>
    <MdExitToApp />
  </StyledIconButton>
);
