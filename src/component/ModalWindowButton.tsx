import * as React from "react";
import { MdClose } from "react-icons/md";
import { connect } from "react-redux";

import * as environment from "../state/environment";
import CircleButton from "./CircleButton";
import ModalButton, { IButtonProps, IContentProps } from "./ModalButton";

import "./style/ModalWindowButton.css";

interface IProps<B> extends Partial<environment.IState> {
  buttonComponent: (props: B & IButtonProps) => JSX.Element;
  buttonProps?: B;
  onOpen?: () => void;
  showCloseButton?: boolean;
}

@connect(({ environment }) => environment)
export default class<B> extends React.Component<IProps<B>> {
  public render() {
    const { buttonComponent, buttonProps, onOpen } = this.props;

    return (
      <ModalButton
        buttonComponent={buttonComponent}
        buttonProps={buttonProps}
        contentComponent={this.contentComponent}
        onOpen={onOpen}
        transitionClassNames="ModalWindowButton"
      />
    );
  }

  private contentComponent = ({
    closeWindow,
    opened
  }: IContentProps): JSX.Element => {
    const { children, isSmallWindow, onOpen, showCloseButton } = this.props;

    return (
      <div className="ModalWindowButton" onClick={closeWindow}>
        {(isSmallWindow || showCloseButton) && (
          <div className="close-button">
            <CircleButton onClick={closeWindow}>
              <MdClose />
            </CircleButton>
          </div>
        )}
        <div className="window" onClick={event => event.stopPropagation()}>
          {typeof children === "function"
            ? (children as (close: () => void) => JSX.Element)(closeWindow)
            : children}
        </div>
      </div>
    );
  };
}
