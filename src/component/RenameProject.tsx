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
                    onKeyDown={(event: React.KeyboardEvent<{}>) => {
                        if (event.keyCode === 13) {
                            this.setState({ editing: false });
                            event.preventDefault();
                        }
                    }}
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
