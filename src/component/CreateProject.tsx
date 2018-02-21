import * as React from "react";
import Plus = require("react-icons/lib/md/add");
import { connect } from "react-redux";

import * as tasks from "../state/tasks";
import IconedButton from "./IconedButton";

import "./style/CreateProject.css";

interface IState {
    editing: boolean;
    name: string;
}

class CreateProject extends React.Component<tasks.IActionCreators, IState> {
    public state = { editing: false, name: "" };

    public render() {
        const { addProject } = this.props;
        const { editing, name } = this.state;

        if (editing) {
            return (
                <form
                    onSubmit={(event) => {
                        addProject(name);
                        this.setState({ editing: false, name: "" });
                        event.preventDefault();
                    }}
                >
                    <input
                        autoFocus={true}
                        onBlur={() => this.setState({ editing: false })}
                        onChange={({ target: { value } }) => this.setState({ name: value })}
                        placeholder="Name"
                        value={name}
                    />
                </form>
            );
        }

        return (
            <IconedButton icon={<Plus />} onClick={() => this.setState({ editing: true })}>
                <div className="CreateProject-button-text">new</div>
            </IconedButton>
        );
    }
}

export default connect(null, tasks.actionCreators)(CreateProject);
