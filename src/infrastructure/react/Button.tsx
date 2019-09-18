import { FC, HTMLAttributes, HTMLProps, ReactNode } from "react";
import styled from "styled-components";
import { boxShadow } from "./style";

interface IProps
  extends HTMLProps<HTMLButtonElement>,
    HTMLAttributes<HTMLButtonElement> {
  secondary?: boolean;
  children?: ReactNode;
}

export const Button: FC<IProps> = styled.button<{ secondary?: boolean }>`
  ${boxShadow};
  background: ${({ secondary }) => (secondary ? "darkgrey" : "indianred")}
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: inherit;
  color: white;
  border: none;
  cursor: pointer;
  flex-shrink: 0;
` as FC<any>;
