import * as React from "react";

import "./style/SettingsItem.css";

export default ({
  children,
  label
}: {
  children?: React.ReactNode;
  label: string;
}) => (
  <div className="SettingsItem">
    {label}
    {children}
  </div>
);
