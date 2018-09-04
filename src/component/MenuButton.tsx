import * as React from "react";
import { MdMenu } from "react-icons/md";
import styled, { css } from "styled-components";
import transition from "styled-transition-group";

import config from "../config";
import { shortDuration } from "../style/animation";
import { darkGrey, transparentBlack } from "../style/colors";
import CircleButton from "./CircleButton";
import MenuBox, { IProps as IMenuBoxProps } from "./MenuBox";
import ModalButton, { IButtonProps, IContentProps } from "./ModalButton";

const MenuButton = styled(CircleButton)<{ covert: boolean }>`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  transition: ${shortDuration};

  ${({ covert }) =>
    covert
      ? css`
          opacity: 0;
          visibility: hidden;
        `
      : css``};
`;

const Menu = transition.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background: ${transparentBlack};
  transition: ${shortDuration};
  z-index: 100;

  > * {
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    transition: ${shortDuration};
    z-index: 200;
  }

  &:appear,
  &:exit {
    background: transparent;
    visibility: hidden;

    > * {
      transform: translateX(100%);
    }
  }
`;

export interface IProps extends IMenuBoxProps {
  hidden?: boolean;
}

export default class extends React.Component<IProps> {
  public render() {
    return (
      <ModalButton
        buttonComponent={this.buttonComponent}
        closed={this.props.hidden}
      >
        {this.contentComponent}
      </ModalButton>
    );
  }

  private buttonComponent = ({ openWindow }: IButtonProps): JSX.Element => (
    <MenuButton
      backgroundColor={darkGrey}
      onClick={openWindow}
      covert={this.props.hidden}
    >
      <MdMenu />
    </MenuButton>
  );

  private contentComponent = ({
    closeWindow,
    opened
  }: IContentProps): JSX.Element => (
    <Menu
      appear={true}
      in={opened}
      timeout={{ enter: 0, exit: config.maxAnimationDelayMs }}
      onClick={closeWindow}
    >
      <MenuBox {...this.props} />
    </Menu>
  );
}
