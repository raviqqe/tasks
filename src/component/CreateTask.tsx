import * as React from "react";
import { MdAdd } from "react-icons/md";
import { connect } from "react-redux";
import styled from "styled-components";

import { createTask, ITask } from "../domain/task";
import * as tasks from "../state/tasks";
import { normalBorder } from "../style/borders";
import { verticalMargin } from "../style/margin";
import IconedButton from "./IconedButton";
import Input from "./Input";
import ModalWindowButton from "./ModalWindowButton";
import OriginalTextArea from "./TextArea";

const Form = styled.form`
  ${normalBorder};
  ${verticalMargin("0.6em")};
  background: white;
  width: 40em;
  padding: 1em;
`;

const TextArea = styled(OriginalTextArea)`
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
            <Input
              innerRef={this.input}
              placeholder="Name"
              value={name}
              onChange={({ target: { value } }) =>
                this.setState({ name: value })
              }
            />
            <TextArea
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
