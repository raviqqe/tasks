import * as React from "react";
import styled from "styled-components";

import Button from "./Button";

const CircleButton = styled(Button)`
  font-size: 2em;
  width: 1.8em;
  height: 1.8em;
  padding: 0;
  border-radius: 1.8em;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ({
  children,
  ...props
}: {
  backgroundColor?: string;
  children?: React.ReactNode;
  onClick: () => void;
}) => (
  <CircleButton alwaysShadowed={true} {...props}>
    {children}
  </CircleButton>
);
