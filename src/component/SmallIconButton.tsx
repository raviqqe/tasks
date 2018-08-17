import * as React from "react";

import "./style/SmallIconButton.css";

export default ({
  children,
  onClick
}: {
  children?: React.ReactNode;
  onClick: () => void;
}) => (
  <div
    className="SmallIconButton"
    onClick={event => {
      onClick();
      event.stopPropagation();
    }}
  >
    {children}
  </div>
);
