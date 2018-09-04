import * as React from "react";
import * as ReactDOM from "react-dom";

import config from "../config";

export interface IButtonProps {
  opened: boolean;
  openWindow: () => void;
}

export interface IContentProps {
  closeWindow: () => void;
  opened: boolean;
}

interface IProps {
  buttonComponent: (props: IButtonProps) => JSX.Element;
  children: (props: IContentProps) => JSX.Element;
  closed?: boolean;
}

interface IState {
  opened: boolean;
}

export default class extends React.Component<IProps, IState> {
  public state: IState = { opened: false };
  private modal: HTMLDivElement | null = null;

  public render() {
    const { buttonComponent, children } = this.props;
    const { opened } = this.state;

    const Button = buttonComponent;
    const Content = children;

    return (
      <>
        <Button
          opened={opened}
          openWindow={() => this.setState({ opened: true })}
        />
        {!!this.modal &&
          ReactDOM.createPortal(
            <Content
              closeWindow={() => this.setState({ opened: false })}
              opened={opened}
            />,
            this.modal
          )}
      </>
    );
  }

  public componeneDidMount() {
    this.setState({ opened: !this.props.closed });
  }

  public componentWillUnmount() {
    this.removeElement();
  }

  public componentDidUpdate({ closed }: IProps, { opened }: IState) {
    if (!opened && this.state.opened) {
      this.createElement();
      this.forceUpdate();
    } else if (opened && !this.state.opened) {
      setTimeout(() => this.removeElement(), config.maxAnimationDelayMs);
    }

    if (!closed && this.props.closed) {
      this.setState({ opened: false });
    }
  }

  private createElement = (): void => {
    if (!this.modal) {
      this.modal = document.createElement("div");
      document.getElementById(config.rootId).appendChild(this.modal);
    }
  };

  private removeElement = (): void => {
    if (this.modal) {
      this.modal.remove();
      this.modal = null;
    }
  };
}
