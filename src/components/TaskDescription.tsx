import $ from "jquery";
import React, { Component, createRef, KeyboardEvent, RefObject } from "react";
import Markdown = require("react-markdown");
import styled from "styled-components";

import { grey } from "../style/colors";
import OriginalTextArea from "./TextArea";
import withInputState, { IInternalProps, IProps } from "./with-input-state";

const Description = styled.div`
  cursor: text;
`;

const Message = styled.div`
  color: ${grey};
`;

const TextArea = styled(OriginalTextArea)`
  height: 20vh;
  resize: vertical;
`;

export default withInputState(
  class extends Component<IProps & IInternalProps> {
    private ref: RefObject<HTMLDivElement> = createRef();

    public render() {
      const { editing, inputProps, stopEditing } = this.props;

      if (editing) {
        return (
          <TextArea
            onKeyDown={(event: KeyboardEvent<HTMLTextAreaElement>) => {
              if (
                (event.keyCode === 83 && event.ctrlKey) ||
                (event.keyCode === 13 && event.shiftKey)
              ) {
                stopEditing();
                event.preventDefault();
              }
            }}
            {...inputProps}
          />
        );
      }

      const { startEditing, text } = this.props;

      return (
        <Description innerRef={this.ref} onClick={startEditing}>
          {text.trim() ? (
            <Markdown
              source={text}
              renderers={{
                Link: ({ href, children }) => (
                  <a href={href} onClick={event => event.stopPropagation()}>
                    {children}
                  </a>
                )
              }}
            />
          ) : (
            <Message>No description</Message>
          )}
        </Description>
      );
    }

    public componentDidUpdate() {
      if (
        this.ref.current &&
        !$(this.ref.current)
          .text()
          .trim()
      ) {
        this.props.onEdit("");
      }
    }
  }
);
