import * as React from "react";

import "./style/SettingsItem.css";

interface IProps {
  label: string;
}

export default class extends React.Component<IProps> {
  public render() {
    const { children, label } = this.props;

    return (
      <div className="SettingsItem">
        {label}
        {children}
      </div>
    );
  }
}
