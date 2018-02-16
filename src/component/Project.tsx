import * as React from "react";

import NoBoxButton from "./NoBoxButton";
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
            <NoBoxButton
                className={"Project-name" + (disabled ? "-disabled" : "")}
                onClick={onClick}
            >
                {name}
            </NoBoxButton>
        );
    }
}
