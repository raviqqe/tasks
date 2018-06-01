import * as React from "react";
import Plus = require("react-icons/lib/md/add");
import { connect } from "react-redux";

import * as tasks from "../state/tasks";
import IconedButton from "./IconedButton";
import ModalWindowButton from "./ModalWindowButton";

import "./style/CreateProject.css";

interface IState {
    name: string;
}

class CreateProject extends React.Component<tasks.IActionCreators, IState> {
    public input: HTMLElement;
    public state: IState = { name: "" };

    public render() {
        const { addProject } = this.props;
        const { name } = this.state;

        return (
            <ModalWindowButton
                buttonComponent={({ openWindow }) =>
                    <IconedButton icon={<Plus />} onClick={openWindow}>add</IconedButton>}
                onOpen={() => this.input && this.input.focus()}
            >
                {(closeWindow) =>
                    <form
                        className="CreateProject"
                        onSubmit={(event) => {
                            addProject(name);
                            this.setState({ name: "" });
                            closeWindow();
                            event.preventDefault();
                        }}
                    >
                        <input
                            onChange={({ target: { value } }) => this.setState({ name: value })}
                            placeholder="Name"
                            ref={(input) => this.input = input}
                            value={name}
                        />
                    </form>}
            </ModalWindowButton>
        );
    }
}

export default connect(null, tasks.actionCreators)(CreateProject);
