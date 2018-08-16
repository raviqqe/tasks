import * as React from "react";
import TextArea from "react-autosize-textarea";
import { MdAdd } from "react-icons/md";
import { connect } from "react-redux";

import { createTask, ITask } from "../domain/task";
import * as tasks from "../state/tasks";
import IconedButton from "./IconedButton";
import ModalWindowButton from "./ModalWindowButton";

import "./style/CreateTask.css";

interface IState {
  description: string;
  name: string;
}

class CreateTask extends React.Component<tasks.IActionCreators, IState> {
  public input: HTMLElement;
  public state: IState = { description: "", name: "" };

  public render() {
    const { addTask } = this.props;
    const { description, name } = this.state;

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
            className="CreateTask"
            onSubmit={event => {
              addTask(createTask(name, description));
              this.setState({ description: "", name: "" });
              closeWindow();
              event.preventDefault();
            }}
          >
            <input
              ref={input => (this.input = input)}
              placeholder="Name"
              value={name}
              onChange={({ target: { value } }) =>
                this.setState({ name: value })
              }
            />
            <TextArea
              async={true}
              className="description"
              placeholder="Description"
              value={description}
              onChange={({ target: { value } }: any) =>
                this.setState({ description: value })
              }
            />
            <IconedButton icon={<MdAdd />} type="submit">
              add
            </IconedButton>
          </form>
        )}
      </ModalWindowButton>
    );
  }
}

export default connect(
  null,
  tasks.actionCreators
)(CreateTask);
