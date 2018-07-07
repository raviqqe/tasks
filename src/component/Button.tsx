import waves = require("node-waves");
import "node-waves/dist/waves.css";
import * as React from "react";

import "./style/Button.css";

interface IProps {
  className?: string;
  onClick?: () => void;
  type?: string;
}

export default class extends React.Component<IProps> {
  private button: HTMLButtonElement;

  public render() {
    const { children, className, onClick, type } = this.props;

    return (
      <button
        ref={button => (this.button = button)}
        className={className || "Button"}
        onClick={
          onClick &&
          (event => {
            onClick();
            event.stopPropagation();
          })
        }
        type={type}
      >
        {children}
      </button>
    );
  }

  public componentDidMount() {
    this.componentDidUpdate();
  }

  public componentDidUpdate() {
    if (this.button) {
      waves.attach(this.button, ["waves-light"]);
      waves.init();
    }
  }
}
