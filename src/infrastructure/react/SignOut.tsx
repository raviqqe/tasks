import { defaultImport } from "default-import";
import { MdExitToApp } from "react-icons/md/index.js";
import defaultStyled from "styled-components";
import { IconButton } from "./IconButton.js";
import { white } from "./style/colors.js";

const styled = defaultImport(defaultStyled);

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
