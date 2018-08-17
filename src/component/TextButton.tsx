import * as React from "react";

import "./style/TextButton.css";

export default ({
  children,
  disabled,
  icon,
  onClick
}: {
  children?: React.ReactNode;
  disabled?: boolean;
  icon?: JSX.Element;
  onClick: () => void;
}) => (
  <button className="TextButton" data-disabled={disabled} onClick={onClick}>
    {icon}
    {children}
  </button>
);
