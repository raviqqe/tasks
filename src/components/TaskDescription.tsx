import $ from "jquery";
import React, { Component, createRef, KeyboardEvent, RefObject } from "react";
import Markdown = require("react-markdown");
import { mapProps } from "recompose";
import styled, { css } from "styled-components";

import { grey, red } from "../style/colors";
import OriginalTextArea from "./TextArea";
import withInputState, { IInternalProps, IProps } from "./with-input-state";

const Description = styled.div`
  cursor: text;

  ${[1, 2, 3, 4, 5, 6].map(
    level => css`
      h${level} {
        font-size: 1em;

        &::before {
          content: "${"#".repeat(level)} ";
        }
      }
    `
  )};

  a {
    color: ${red};

    &:visited {
      color: ${red};
    }
  }
`;

const Message = styled.div`
  color: ${grey};
`;

const TextArea = styled(OriginalTextArea)`
  height: 20vh;
  resize: vertical;
`;

class TaskDescription extends Component<IProps & IInternalProps> {
  private ref: RefObject<HTMLDivElement> = createRef();

  public render() {
    const { editing, inputProps, stopEditing } = this.props;

    if (editing) {
      return (
        <TextArea
          onKeyDown={(event: KeyboardEvent<HTMLTextAreaElement>) => {
            if (event.keyCode === 13 && event.shiftKey) {
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
          <Markdown source={text} />
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

export default mapProps(({ onEdit, ...props }: IProps) => ({
  ...props,
  onEdit: (text: string) => onEdit(text.trim())
}))(withInputState(TaskDescription));
