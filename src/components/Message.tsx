import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { IGlobalState } from "../state";
import * as message from "../state/message";
import { normalBorder } from "../style/borders";
import { yellow } from "../style/colors";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  display: flex;
  justify-content: center;
  pointer-events: none;
  z-index: 1000;
`;

const Box = styled.div<{ covert: boolean }>`
  ${normalBorder};
  color: white;
  cursor: pointer;
  font-size: 1.2em;
  background: ${yellow};
  max-width: 100%;
  padding: 1em 2em;
  margin: 1em;
  transition: transform 0.2s;
  pointer-events: auto;
  transform: translateY(${({ covert }) => (covert ? "-200%" : "0%")});
`;

// Keep previous messages until they go away from screens.
interface IState {
  message: string;
}

class Message extends Component<
  message.IState & message.IActionCreators,
  IState
> {
  public state: IState = { message: "" };

  public render() {
    const { clearMessage, message } = this.props;

    return (
      <Wrapper>
        <Box covert={!message} onClick={() => clearMessage()}>
          {this.state.message}
        </Box>
      </Wrapper>
    );
  }

  public componentWillUpdate({ message }) {
    if (message && message !== this.state.message) {
      this.setState({ message });
    }
  }
}

export default connect(
  ({ message }: IGlobalState) => message,
  message.actionCreators
)(Message);
