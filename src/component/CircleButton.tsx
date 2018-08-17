import * as React from "react";

import Button from "./Button";
import "./style/CircleButton.css";

export default ({
  children,
  className,
  onClick
}: {
  children?: React.ReactNode;
  className?: string;
  onClick: () => void;
}) => (
  <Button className={className || "CircleButton"} onClick={onClick}>
    {children}
  </Button>
);
