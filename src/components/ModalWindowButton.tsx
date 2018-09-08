import React, { Component, ComponentType } from "react";
import { MdClose } from "react-icons/md";
import { connect } from "react-redux";
import styled, { css } from "styled-components";
import transition from "styled-transition-group";

import * as environment from "../state/environment";
import { longDuration, maxDurationMs } from "../style/animation";
import { normalBorder } from "../style/borders";
import { transparentBlack } from "../style/colors";
import { withWindowSmall } from "../style/media";
import CircleButton from "./CircleButton";
import ModalButton, { IButtonProps, IContentProps } from "./ModalButton";

const CloseButton = styled(CircleButton)`
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 200;

  ${withWindowSmall(css`
    top: auto;
    bottom: 1rem;
  `)};
`;

const Modal = transition.div`
  position: fixed;
  top: 0;
  left: 0;

  ${withWindowSmall(css`
    left: auto;
    right: 0;
  `)};

  z-index: 100;
  width: 100vw;
  height: 100vh;
  padding: 1em;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${transparentBlack};
  visibility: visible;
  transition: background ${longDuration}, visibility ${longDuration};

  > * {
    transition: transform ${longDuration};
  }

  &:appear,
  &:exit {
    visibility: hidden;
    background: transparent;

    > * {
      transform: translateY(calc(-100vh - 100%));
    }
  }
`;

const Window = styled.div`
  ${normalBorder};
  background: white;
  display: flex;
  max-width: 100%;
  margin: auto;
`;

interface IProps extends Partial<environment.IState> {
  buttonComponent: ComponentType<IButtonProps>;
  onOpen?: () => void;
  showCloseButton?: boolean;
}

@connect(({ environment }) => environment)
export default class extends Component<IProps> {
  public render() {
    const { buttonComponent } = this.props;

    return (
      <ModalButton buttonComponent={buttonComponent}>
        {this.contentComponent}
      </ModalButton>
    );
  }

  private contentComponent = ({
    closeWindow,
    opened
  }: IContentProps): JSX.Element => {
    const { children, windowSmall, onOpen, showCloseButton } = this.props;

    return (
      <Modal
        appear={true}
        in={opened}
        onClick={closeWindow}
        onEntered={() => setTimeout(onOpen, maxDurationMs)}
        timeout={{ enter: 0, exit: maxDurationMs }}
      >
        {(windowSmall || showCloseButton) && (
          <CloseButton onClick={closeWindow}>
            <MdClose />
          </CloseButton>
        )}
        <Window onClick={event => event.stopPropagation()}>
          {typeof children === "function"
            ? (children as (close: () => void) => JSX.Element)(closeWindow)
            : children}
        </Window>
      </Modal>
    );
  };
}
