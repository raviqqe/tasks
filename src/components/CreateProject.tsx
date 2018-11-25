import React, { Component, createRef, RefObject } from "react";
import { MdAdd } from "react-icons/md";
import { connect } from "react-redux";
import styled from "styled-components";

import * as tasks from "../state/tasks";
import { normalBorder } from "../style/borders";
import IconedButton from "./IconedButton";
import Input from "./Input";
import ModalWindowButton from "./ModalWindowButton";

const Form = styled.form`
  ${normalBorder};
  background: white;
  padding: 1em;
  font-size: 1.2em;
`;

interface IState {
  name: string;
}

class CreateProject extends Component<tasks.IActionCreators, IState> {
  public input: RefObject<HTMLInputElement> = createRef();
  public state: IState = { name: "" };

  public render() {
    const { addProject } = this.props;
    const { name } = this.state;

    return (
      <ModalWindowButton
        buttonComponent={({ openWindow }) => (
          <IconedButton icon={<MdAdd />} onClick={openWindow}>
            add
          </IconedButton>
        )}
        onOpen={() => this.input.current && this.input.current.focus()}
      >
        {closeWindow => (
          <Form
            onSubmit={event => {
              addProject(name.trim());
              this.setState({ name: "" });
              closeWindow();
              event.preventDefault();
            }}
          >
            <Input
              ref={this.input}
              onChange={({ target: { value } }) =>
                this.setState({ name: value })
              }
              placeholder="Name"
              value={name}
            />
          </Form>
        )}
      </ModalWindowButton>
    );
  }
}

export default connect(
  null,
  tasks.actionCreators
)(CreateProject);
