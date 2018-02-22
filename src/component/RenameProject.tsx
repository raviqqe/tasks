import * as React from "react";

import Button from "./Button";
import InputComponent, { IProps as IInputComponentProps } from "./InputComponent";

import "./style/RenameProject.css";

export default class extends InputComponent {
    public render() {
        if (this.state.editing) {
            return (
                <input
                    className="RenameProject-input"
                    onKeyDown={this.onEnterKeyDown}
                    {...this.getFormProps()}
                />
            );
        }

        return (
            <Button
                className="RenameProject-button"
                onClick={() => this.setState({ editing: true })}
            >
                Rename
            </Button>
        );
    }
}
