import * as React from "react";

import Button from "./Button";

import "./style/IconedButton.css";

export default ({
  children,
  className,
  icon,
  onClick,
  type
}: {
  children?: React.ReactNode;
  className?: string;
  icon: JSX.Element;
  onClick?: () => void;
  type?: string;
}) => (
  <Button className={className || "IconedButton"} onClick={onClick} type={type}>
    <div className="icon">{icon}</div>
    <div className="label">{children}</div>
  </Button>
);
