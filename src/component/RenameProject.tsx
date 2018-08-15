import * as React from "react";
import { MdEdit } from "react-icons/md";
import { connect } from "react-redux";

import * as tasks from "../state/tasks";
import IconedButton from "./IconedButton";
import ModalWindowButton from "./ModalWindowButton";

import "./style/RenameProject.css";

interface IState {
  name: string;
}

class RenameProject extends React.Component<
  tasks.IState & tasks.IActionCreators,
  IState
> {
  public input: HTMLElement;
  public state: IState = { name: "" };

  public render() {
    const { currentProjectName, renameProject } = this.props;
    const { name } = this.state;

    return (
      <ModalWindowButton
        buttonComponent={({ openWindow }) => (
          <IconedButton
            className="RenameProject-button"
            icon={<MdEdit />}
            onClick={openWindow}
          >
            rename
          </IconedButton>
        )}
        onOpen={() => {
          if (this.input) {
            this.input.focus();
          }

          this.setState({ name: currentProjectName });
        }}
      >
        {closeWindow => (
          <form
            className="RenameProject"
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
              ref={input => (this.input = input)}
              value={name}
            />
          </form>
        )}
      </ModalWindowButton>
    );
  }
}

export default connect(
  ({ tasks }) => tasks,
  tasks.actionCreators
)(RenameProject);
