import React, { AriaAttributes, ReactNode } from "react";
import styled from "styled-components";

const Button = styled.div`
  text-shadow: 0rem 0.2rem 0.2rem rgba(0, 0, 0, 0.2);
  color: grey;
  cursor: pointer;
  font-size: 1.5em;
  display: flex;
`;

interface IProps extends AriaAttributes {
  children: ReactNode;
  onClick: () => void;
}

export const IconButton = ({ children, onClick, ...restProps }: IProps) => (
  <Button onClick={onClick} {...restProps}>
    {children}
  </Button>
);
