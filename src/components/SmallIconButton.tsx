import React, { ReactNode } from "react";
import styled, { css } from "styled-components";

import { instantDuration } from "../style/animation";
import { black, grey, red } from "../style/colors";
import { withWindowSmall } from "../style/media";

const Button = styled.div`
  color: ${black};
  cursor: pointer;
  font-size: 1.5em;
  display: flex;
  transition: color ${instantDuration}, transform ${instantDuration};

  &:hover {
    color: ${red};
    transform: scale(1.5, 1.5);
  }

  ${withWindowSmall(css`
    color: ${grey};
  `)};
`;

export default ({
  children,
  onClick
}: {
  children?: ReactNode;
  onClick: () => void;
}) => (
  <Button
    onClick={event => {
      onClick();
      event.stopPropagation();
    }}
  >
    {children}
  </Button>
);
