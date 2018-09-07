import * as React from "react";
import styled from "styled-components";

import { black, red } from "../style/colors";
import Input from "./Input";
import InputComponent, {
  IProps as IInputComponentProps
} from "./InputComponent";

const NameInput = styled(Input)`
  font-size: 1.1em;
`;

const Name = styled.div<{ editable: boolean; highlighted: boolean }>`
  font-size: 1.1em;
  cursor: ${({ editable }) => (editable ? "text" : "auto")};
  color: ${({ highlighted }) => (highlighted ? red : black)};
`;

interface IProps extends IInputComponentProps {
  highlighted?: boolean;
}

export default class extends InputComponent<IProps> {
  public render() {
    if (this.state.editing) {
      return (
        <NameInput onKeyDown={this.onEnterKeyDown} {...this.getFormProps()} />
      );
    }

    const { highlighted, onEdit, text } = this.props;
    const editable = !!onEdit;

    return (
      <Name
        editable={editable}
        highlighted={highlighted}
        onClick={() => this.setState({ editing: editable })}
      >
        {text}
      </Name>
    );
  }
}
