import React, { useEffect, useState } from "react";
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

const Message = ({
  clearMessage,
  message
}: message.IState & message.IActionCreators) => {
  // Keep previous messages until they go away from screens.
  const [previousMessage, setMessage] = useState("");

  useEffect(() => {
    if (message && message !== previousMessage) {
      setMessage(message);
    }
  }, [message, previousMessage]);

  return (
    <Wrapper>
      <Box covert={!message} onClick={() => clearMessage()}>
        {previousMessage}
      </Box>
    </Wrapper>
  );
};

export default connect(
  ({ message }: IGlobalState) => message,
  message.actionCreators
)(Message);
