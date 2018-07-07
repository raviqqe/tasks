import * as React from "react";

import Button from "./Button";

import "./style/IconedButton.css";

interface IProps {
  className?: string;
  icon: JSX.Element;
  onClick?: () => void;
  type?: string;
}

export default class extends React.Component<IProps> {
  public render() {
    const { children, className, icon, onClick, type } = this.props;

    return (
      <Button
        className={className || "IconedButton"}
        onClick={onClick}
        type={type}
      >
        <div className="icon">{icon}</div>
        <div className="label">{children}</div>
      </Button>
    );
  }
}
