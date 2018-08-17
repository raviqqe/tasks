import * as React from "react";
import { MdAdd } from "react-icons/md";
import { connect } from "react-redux";

import * as tasks from "../state/tasks";
import IconedButton from "./IconedButton";
import ModalWindowButton from "./ModalWindowButton";

import "./style/CreateProject.css";

interface IState {
  name: string;
}

@connect(
  null,
  tasks.actionCreators
)
export default class extends React.Component<
  Partial<tasks.IActionCreators>,
  IState
> {
  public input: HTMLElement;
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
        onOpen={() => this.input && this.input.focus()}
      >
        {closeWindow => (
          <form
            className="CreateProject"
            onSubmit={event => {
              addProject(name);
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
              ref={input => (this.input = input)}
              value={name}
            />
          </form>
        )}
      </ModalWindowButton>
    );
  }
}
