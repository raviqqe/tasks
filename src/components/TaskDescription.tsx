import $ from "jquery";
import React, { KeyboardEvent, RefObject, useEffect, useRef } from "react";
import Markdown from "react-markdown";
import styled, { css } from "styled-components";

import { grey, red } from "../style/colors";
import OriginalTextArea from "./TextArea";
import { useInputState } from "./utilities";

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

  table {
    border-collapse: collapse;
  }

  table,
  td,
  th {
    border: 1px solid ${grey};
  }

  td,
  th {
    padding: 0.4em 0.6em;
  }
`;

const Message = styled.div`
  color: ${grey};
`;

const TextArea = styled(OriginalTextArea)`
  height: 20vh;
  resize: vertical;
`;

interface IProps {
  children: string;
  onEdit: (description: string) => void;
}

export default ({ children, onEdit }: IProps) => {
  const { editing, setEditing, inputProps } = useInputState(children, onEdit);
  const ref: RefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    if (
      ref.current &&
      !$(ref.current)
        .text()
        .trim()
    ) {
      onEdit("");
    }
  });

  if (editing) {
    return (
      <TextArea
        onKeyDown={(event: KeyboardEvent<HTMLTextAreaElement>) => {
          if (event.keyCode === 13 && event.shiftKey) {
            setEditing(false);
            event.preventDefault();
          }
        }}
        {...inputProps}
      />
    );
  }

  return (
    <Description ref={ref} onClick={() => setEditing(true)}>
      {children.trim() ? (
        <Markdown source={children} />
      ) : (
        <Message>No description</Message>
      )}
    </Description>
  );
};
