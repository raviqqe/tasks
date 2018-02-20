import * as React from "react";
import { connect } from "react-redux";

import { actionCreators } from "../state/tasks";
import Button from "./Button";

import "./style/RenameProject.css";

interface IProps {
    currentProjectName: string;
    renameProject: (name: string) => void;
}

interface IState {
    editing: boolean;
    name: string;
}

class RenameProject extends React.Component<IProps, IState> {
    public state = { editing: false, name: "" };

    public render() {
        const { currentProjectName, renameProject } = this.props;
        const { editing, name } = this.state;

        if (editing) {
            return (
                <form
                    onSubmit={(event) => {
                        renameProject(name);
                        this.setState({ editing: false, name: "" });
                        event.preventDefault();
                    }}
                >
                    <input
                        className="RenameProject-input"
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
            <Button
                className="RenameProject-button"
                onClick={() => this.setState({ editing: true, name: currentProjectName })}
            >
                Rename
            </Button>
        );
    }
}

export default connect(({ tasks }) => tasks, actionCreators)(RenameProject);
