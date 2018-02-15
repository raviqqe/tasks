import * as React from "react";
import { connect } from "react-redux";

import { createTask, ITask } from "../domain/task";
import { actionCreators } from "../state/tasks";
import Button from "./Button";
import CreateItem from "./CreateItem";
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
            <CreateItem
                createItem={() => {
                    addTask(createTask(name, description));
                    this.setState({ description: "", name: "" });
                }}
                focus={() => this.input && this.input.focus()}
            >
                <input
                    ref={this.ref}
                    placeholder="Name"
                    value={name}
                    onChange={({ target: { value } }) => this.setState({ name: value })}
                />
                <textarea
                    className="CreateTask-description"
                    placeholder="Description"
                    value={description}
                    onChange={({ target: { value } }) => this.setState({ description: value })}
                />
                <div className="CreateTask-buttons">
                    <Button className="CreateTask-button" type="submit">Create</Button>
                    <Button className="CreateTask-cancel-button" type="reset">Cancel</Button>
                </div>
            </CreateItem>
        );
    }

    private ref = (input) => this.input = input;
}

export default connect(null, actionCreators)(CreateTask);
