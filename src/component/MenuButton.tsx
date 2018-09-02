import * as React from "react";
import { MdMenu } from "react-icons/md";

import CircleButton from "./CircleButton";
import MenuBox, { IProps as IMenuBoxProps } from "./MenuBox";
import ModalButton, { IButtonProps, IContentProps } from "./ModalButton";

import { darkGrey } from "../style/colors";
import "./style/MenuButton.css";

export interface IProps extends IMenuBoxProps {
  hidden?: boolean;
}

export default class extends React.Component<IProps> {
  public render() {
    return (
      <ModalButton
        buttonComponent={this.buttonComponent}
        closed={this.props.hidden}
        contentComponent={this.contentComponent}
        transitionClassNames="MenuButton-menu"
      />
    );
  }

  private buttonComponent = ({ openWindow }: IButtonProps): JSX.Element => (
    <div
      className="MenuButton-button-container"
      data-hidden={this.props.hidden}
    >
      <CircleButton backgroundColor={darkGrey} onClick={openWindow}>
        <MdMenu />
      </CircleButton>
    </div>
  );

  private contentComponent = ({ closeWindow }: IContentProps): JSX.Element => (
    <div className="MenuButton-menu" onClick={closeWindow}>
      <MenuBox {...this.props} />
    </div>
  );
}
