import { defaultImport } from "default-import";
import { AriaAttributes, ReactNode } from "react";
import defaultStyled from "styled-components";
import { grey } from "./style/colors.js";

const styled = defaultImport(defaultStyled);

const Button = styled.div`
  color: ${grey};
  cursor: pointer;
  font-size: 1.5em;
  display: flex;
`;

interface IProps extends AriaAttributes {
  children: ReactNode;
  onClick: () => void;
}

export const IconButton = ({
  children,
  onClick,
  ...restProps
}: IProps): JSX.Element => (
  <Button onClick={onClick} {...restProps}>
    {children}
  </Button>
);
