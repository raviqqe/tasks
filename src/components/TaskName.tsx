import React from "react";
import styled from "styled-components";

import { black, red } from "../style/colors";
import Input from "./Input";
import { useInputState } from "./utilities";

const NameInput = styled(Input)`
  font-size: 1.1em;
`;

const Name = styled.div<{ editable: boolean; highlighted: boolean }>`
  font-size: 1.1em;
  cursor: ${({ editable }) => (editable ? "text" : "auto")};
  color: ${({ highlighted }) => (highlighted ? red : black)};
`;

interface IProps {
  children: string;
  highlighted?: boolean;
  onEdit?: (name: string) => void;
}

export default ({ highlighted, onEdit, children }: IProps) => {
  if (!onEdit) {
    return (
      <Name editable={false} highlighted={!!highlighted}>
        {children}
      </Name>
    );
  }

  const { editing, setEditing, inputProps } = useInputState(children, onEdit);

  if (editing) {
    return (
      <NameInput
        {...inputProps}
        onKeyDown={event => {
          if (event.keyCode === 13) {
            setEditing(false);
            event.preventDefault();
          }
        }}
      />
    );
  }

  return (
    <Name
      editable={true}
      highlighted={!!highlighted}
      onClick={() => setEditing(true)}
    >
      {children}
    </Name>
  );
};
