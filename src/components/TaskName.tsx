import React, { Component, KeyboardEvent } from "react";
import { mapProps } from "recompose";
import styled from "styled-components";

import { black, red } from "../style/colors";
import Input from "./Input";
import withInputState, {
  IInternalProps,
  IProps as IInputStateProps
} from "./with-input-state";

const NameInput = styled(Input)`
  font-size: 1.1em;
`;

const Name = styled.div<{ editable: boolean; highlighted: boolean }>`
  font-size: 1.1em;
  cursor: ${({ editable }) => (editable ? "text" : "auto")};
  color: ${({ highlighted }) => (highlighted ? red : black)};
`;

interface IOuterProps extends IInputStateProps {
  highlighted?: boolean;
}

interface IProps extends IInternalProps, IOuterProps {}

class TaskName extends Component<IProps> {
  public render() {
    const { editing, inputProps, stopEditing } = this.props;

    if (editing) {
      return (
        <NameInput
          onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
            if (event.keyCode === 13) {
              stopEditing();
              event.preventDefault();
            }
          }}
          {...inputProps}
        />
      );
    }

    const { highlighted, onEdit, startEditing, text } = this.props;
    const editable = !!onEdit;

    return (
      <Name
        editable={editable}
        highlighted={highlighted}
        onClick={() => editable && startEditing()}
      >
        {text}
      </Name>
    );
  }
}

export default mapProps(({ onEdit, ...props }: IOuterProps) => ({
  ...props,
  onEdit: (text: string) => onEdit(text.trim())
}))(withInputState(TaskName));
