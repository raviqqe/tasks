import * as React from "react";
import { MdEdit } from "react-icons/md";
import { connect } from "react-redux";
import styled from "styled-components";

import * as tasks from "../state/tasks";
import { normalBorder } from "../style/border";
import { grey } from "../style/colors";
import IconedButton from "./IconedButton";
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

@connect(
  ({ tasks }) => tasks,
  tasks.actionCreators
)
export default class extends React.Component<
  Partial<tasks.IState & tasks.IActionCreators>,
  IState
> {
  public input: React.RefObject<HTMLInputElement> = React.createRef();
  public state: IState = { name: "" };

  public render() {
    const { currentProjectName, renameProject } = this.props;
    const { name } = this.state;

    return (
      <ModalWindowButton
        buttonComponent={({ openWindow }) => (
          <IconedButton
            backgroundColor={grey}
            icon={<MdEdit />}
            onClick={openWindow}
          >
            rename
          </IconedButton>
        )}
        onOpen={() => {
          if (this.input.current) {
            this.input.current.focus();
          }

          this.setState({ name: currentProjectName });
        }}
      >
        {closeWindow => (
          <Form
            onSubmit={event => {
              renameProject(name);
              this.setState({ name: "" });
              closeWindow();
              event.preventDefault();
            }}
          >
            <input
              onChange={({ target: { value } }) =>
                this.setState({ name: value })
              }
              placeholder="Name"
              ref={this.input}
              value={name}
            />
          </Form>
        )}
      </ModalWindowButton>
    );
  }
}
