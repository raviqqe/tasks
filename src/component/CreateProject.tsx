import * as React from "react";
import Plus = require("react-icons/lib/md/add");
import { connect } from "react-redux";

import { actionCreators } from "../state/tasks";
import IconedButton from "./IconedButton";

import "./style/CreateProject.css";

interface IProps {
    addProject: (name: string) => void;
}

interface IState {
    editing: boolean;
    name: string;
}

class CreateProject extends React.Component<IProps, IState> {
    public state = { editing: false, name: "" };
    private input: HTMLElement;

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

export default connect(null, actionCreators)(CreateProject);
