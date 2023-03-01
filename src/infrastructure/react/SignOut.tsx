import { MdExitToApp } from "react-icons/md/index.js";
import styled from "styled-components";
import { IconButton } from "./IconButton.js";
import { white } from "./style/colors.js";

const StyledIconButton = styled.default(IconButton)`
  color: ${white};
  font-size: 1.6rem;
`;

export interface IProps {
  signOut: () => void;
}

export const SignOut = ({ signOut }: IProps): JSX.Element => (
  <StyledIconButton onClick={signOut}>
    <MdExitToApp />
  </StyledIconButton>
);
