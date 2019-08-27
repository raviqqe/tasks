import React, { ReactNode } from "react";
import Ink from "react-ink";
import styled, { css } from "styled-components";

import { instantDuration } from "../style/animation";
import { red, transparentBlack } from "../style/colors";
import { withMouseAvailable } from "../style/media";

const shadowSize = "0.15rem";

const shadowOn = css`
  transform: translateY(-${shadowSize});
  box-shadow: 0 ${shadowSize} ${shadowSize} ${transparentBlack};
`;

interface IButtonProps {
  alwaysShadowed?: boolean;
  backgroundColor?: string;
}

const Button = styled.button<IButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  background: ${({ backgroundColor }) => backgroundColor || red};
  color: white;
  font: inherit;
  white-space: nowrap;
  padding: 0.4em 1em;
  border: none;
  border-radius: 0.5rem;
  transition: box-shadow ${instantDuration}, transform ${instantDuration};
  cursor: pointer;
  position: relative; // for react-ink

  ${({ alwaysShadowed }) => (alwaysShadowed ? shadowOn : "")};

  ${withMouseAvailable(css`
    &:hover {
      ${shadowOn};
    }
  `)};

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
`;

interface IProps extends IButtonProps {
  children?: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export default ({ children, onClick, ...props }: IProps) => (
  <Button
    onClick={event => {
      if (onClick) {
        onClick();
      }

      event.stopPropagation();
    }}
    {...props}
  >
    {children}
    <Ink />
  </Button>
);
