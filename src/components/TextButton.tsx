import React, { ReactNode } from "react";
import styled, { css } from "styled-components";
import { instantDuration } from "../style/animation";
import { black, grey, red, transparentGrey } from "../style/colors";

const TextButton = styled.button<{ disabled?: boolean }>`
  font: inherit;
  display: flex;
  align-items: center;
  padding: 0.5em;
  border: none;
  border-radius: 0.2em;
  white-space: nowrap;
  background: transparent;
  transition: background ${instantDuration}, color ${instantDuration};

  ${({ disabled }) =>
    disabled
      ? css`
          color: ${red};
          cursor: auto;
        `
      : css`
          color: ${grey};
          cursor: pointer;

          &:hover,
          &:active {
            background: ${transparentGrey};
            color: ${black};
          }
        `};

  > svg {
    font-size: 1.8em;
    margin-right: 0.3em;
  }
`;

export default ({
  children,
  icon,
  ...props
}: {
  children?: ReactNode;
  disabled?: boolean;
  icon?: JSX.Element;
  onClick: () => void;
}) => (
  <TextButton {...props}>
    {icon}
    {children}
  </TextButton>
);
