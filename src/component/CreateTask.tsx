import * as React from "react";
import TextArea from "react-autosize-textarea";
import Plus = require("react-icons/lib/md/add");
import { connect } from "react-redux";

import { createTask, ITask } from "../domain/task";
import * as tasks from "../state/tasks";
import Button from "./Button";
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
                buttonComponent={({ openWindow }) =>
                    <IconedButton icon={<Plus />} onClick={openWindow}>
                        <div className="CreateTask-new-button-text">new</div>
                    </IconedButton>}
                onOpen={() => this.input && this.input.focus()}
            >
                {(closeWindow) =>
                    <form
                        className="CreateTask"
                        onSubmit={(event) => {
                            addTask(createTask(name, description));
                            this.setState({ description: "", name: "" });
                            closeWindow();
                            event.preventDefault();
                        }}
                    >
                        <input
                            ref={(input) => this.input = input}
                            placeholder="Name"
                            value={name}
                            onChange={({ target: { value } }) => this.setState({ name: value })}
                        />
                        <TextArea
                            className="description"
                            placeholder="Description"
                            value={description}
                            onChange={({ target: { value } }: any) =>
                                this.setState({ description: value })}
                        />
                        <Button type="submit">Create</Button>
                    </form>}
            </ModalWindowButton>
        );
    }
}

export default connect(null, tasks.actionCreators)(CreateTask);
