import * as React from "react";
import Plus = require("react-icons/lib/md/add");
import { connect } from "react-redux";

import { createTask, ITask } from "../domain/task";
import { actionCreators } from "../state/tasks";
import Button from "./Button";
import IconedButton from "./IconedButton";
import ModalWindowButton from "./ModalWindowButton";
import "./style/CreateTask.css";

interface IProps {
    addTask: (task: ITask) => void;
}

interface IState {
    description: string;
    name: string;
}

class CreateTask extends React.Component<IProps, IState> {
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
                        onReset={(event) => {
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
                        <textarea
                            className="description"
                            placeholder="Description"
                            value={description}
                            onChange={({ target: { value } }) => this.setState({ description: value })}
                        />
                        <div className="buttons">
                            <Button type="submit">Create</Button>
                            <Button className="cancel-button" type="reset">Cancel</Button>
                        </div>
                    </form>}
            </ModalWindowButton>
        );
    }
}

export default connect(null, actionCreators)(CreateTask);
