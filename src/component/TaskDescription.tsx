import * as React from "react";
import Markdown = require("react-markdown");
import styled from "styled-components";

import { grey } from "../style/colors";
import InputComponent from "./InputComponent";
import OriginalTextArea from "./TextArea";

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

export default class extends InputComponent {
  public render() {
    if (this.state.editing) {
      return (
        <TextArea
          onKeyDown={(event: React.KeyboardEvent<{}>) => {
            if (
              (event.keyCode === 83 && event.ctrlKey) ||
              (event.keyCode === 13 && event.shiftKey)
            ) {
              this.setState({ editing: false });
              event.preventDefault();
            }
          }}
          {...this.getFormProps()}
        />
      );
    }

    const { text } = this.props;

    return (
      <Description onClick={() => this.setState({ editing: true })}>
        {text.trim() ? (
          <Markdown
            source={text}
            renderers={{
              Link: ({ href, title, children }) => (
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
}
