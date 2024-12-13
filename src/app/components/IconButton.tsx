import { styled } from "@linaria/react";
import { CSSProperties, type AriaAttributes, type ReactNode } from "react";
import { grey } from "../style.js";

const Button = styled.div`
  color: ${grey};
  cursor: pointer;
  font-size: 1.5em;
  display: flex;
`;

interface Props extends AriaAttributes {
  children: ReactNode;
  className?: string;
  onClick: () => void;
  style?: CSSProperties;
}

export const IconButton = ({
  children,
  onClick,
  style,
  ...rest
}: Props): JSX.Element => (
  <Button onClick={onClick} {...rest}>
    {children}
  </Button>
);
