import * as React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import * as message from "../state/message";
import { paperBorder } from "../style/border";
import { yellow } from "../style/colors";

const Message = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  display: flex;
  justify-content: center;
  pointer-events: none;
  z-index: 1000;
`;

const Box = styled.div<{ shown: boolean }>`
  ${paperBorder};
  color: white;
  cursor: pointer;
  font-size: 1.2em;
  background: ${yellow};
  max-width: 100%;
  padding: 1em 2em;
  margin: 1em;
  transition: transform 0.2s;
  pointer-events: auto;
  transform: translateY(${({ shown }) => (shown ? "0px" : "-200%")});
`;

// Keep previous messages until they go away from screens.
interface IState {
  message: string;
}

@connect(
  ({ message }) => message,
  message.actionCreators
)
export default class extends React.Component<
  Partial<message.IState & message.IActionCreators>,
  IState
> {
  public state: IState = { message: "" };

  public render() {
    const { clearMessage, message } = this.props;

    return (
      <Message>
        <Box shown={!!message} onClick={() => clearMessage()}>
          {this.state.message}
        </Box>
      </Message>
    );
  }

  public componentWillUpdate({ message }) {
    if (message && message !== this.state.message) {
      this.setState({ message });
    }
  }
}
