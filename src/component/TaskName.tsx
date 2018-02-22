import * as React from "react";
import Markdown = require("react-markdown");

import InputComponent, { IProps as IInputComponentProps } from "./InputComponent";

import "./style/TaskName.css";

interface IProps extends IInputComponentProps {
    highlighted?: boolean;
}

export default class extends InputComponent<IProps> {
    public render() {
        if (this.state.editing) {
            return (
                <input
                    className="TaskName"
                    onKeyDown={this.onEnterKeyDown}
                    {...this.getFormProps()}
                />
            );
        }

        const { highlighted, onEdit, text } = this.props;
        const editable = !!onEdit;

        return (
            <div
                className="TaskName"
                data-editable={editable}
                data-highlighted={highlighted}
                onClick={() => this.setState({ editing: editable })}
            >
                {text}
            </div>
        );
    }
}
