import React, { ReactNode } from "react";
import styled from "styled-components";

const Link = styled.a`
  color: inherit;
  font-size: inherit;
  text-decoration: none;

  &:visited {
    color: inherit;
  }

  &:hover {
    text-decoration: underline;
  }
`;

export default ({ children, href }: { children?: ReactNode; href: string }) => (
  <Link href={href} onClick={event => event.stopPropagation()}>
    {children}
  </Link>
);
