import * as React from "react";

import TextButton from "./TextButton";

import "./style/Project.css";

interface IProps {
    disabled?: boolean;
    name: string;
    onClick: () => void;
}

export default class Project extends React.Component<IProps> {
    public render() {
        const { disabled, name, onClick } = this.props;

        return (
            <TextButton
                className={"Project" + (disabled ? "-disabled" : "")}
                onClick={onClick}
            >
                {name}
            </TextButton>
        );
    }
}
