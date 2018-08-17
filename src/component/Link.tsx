import * as React from "react";

import "./style/Link.css";

export default ({
  children,
  href
}: {
  children?: React.ReactNode;
  href: string;
}) => (
  <a className="Link" href={href} onClick={event => event.stopPropagation()}>
    {children}
  </a>
);
