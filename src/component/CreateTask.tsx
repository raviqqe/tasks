import * as React from "react";
import AutosizedTextArea from "react-autosize-textarea";
import { MdAdd } from "react-icons/md";
import { connect } from "react-redux";
import styled from "styled-components";

import { createTask, ITask } from "../domain/task";
import * as tasks from "../state/tasks";
import { paperBorder } from "../style/border";
import { verticalMargin } from "../style/margin";
import IconedButton from "./IconedButton";
import ModalWindowButton from "./ModalWindowButton";

const Form = styled.form`
  ${paperBorder};
  ${verticalMargin("0.6em")};
  background: white;
  width: 40em;
  padding: 1em;
`;

const TextArea = styled(AutosizedTextArea as any)`
  height: 20vh;
  resize: vertical;
`;

interface IState {
  description: string;
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
  public input: React.RefObject<HTMLInputElement> = React.createRef();
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
        onOpen={() => this.input.current && this.input.current.focus()}
      >
        {closeWindow => (
          <Form
            onSubmit={event => {
              addTask(createTask(name, description));
              this.setState({ description: "", name: "" });
              closeWindow();
              event.preventDefault();
            }}
          >
            <input
              ref={this.input}
              placeholder="Name"
              value={name}
              onChange={({ target: { value } }) =>
                this.setState({ name: value })
              }
            />
            <TextArea
              async={true}
              placeholder="Description"
              value={description}
              onChange={({ target: { value } }: any) =>
                this.setState({ description: value })
              }
            />
            <IconedButton icon={<MdAdd />} type="submit">
              add
            </IconedButton>
          </Form>
        )}
      </ModalWindowButton>
    );
  }
}
