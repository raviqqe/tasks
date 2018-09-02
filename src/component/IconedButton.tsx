import * as React from "react";
import styled from "styled-components";

import { grey } from "../style/colors";
import Button from "./Button";

const Icon = styled.div`
  font-size: 1.5em;
  line-height: 0;
  margin-right: 0.1em;
`;

const Label = styled.div`
  margin-right: 0.2em;
`;

export default ({
  children,
  icon,
  ...props
}: {
  children?: React.ReactNode;
  icon: JSX.Element;
  backgroundColor?: string;
  onClick?: () => void;
  type?: string;
}) => (
  <Button {...props}>
    <Icon>{icon}</Icon>
    <Label>{children}</Label>
  </Button>
);
