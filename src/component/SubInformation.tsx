import * as React from "react";

import "./style/SubInformation.css";

export default ({ children }: { children?: React.ReactNode }) => (
  <div className="SubInformation">{children}</div>
);
