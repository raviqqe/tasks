import * as React from "react";

import NoBoxButton from "./NoBoxButton";
import "./style/Project.css";

interface IProps {
    className?: string;
    projectName: string;
    onClick: () => void;
}

export default class Project extends React.Component<IProps> {
    public render() {
        const { className, projectName, onClick } = this.props;

        return (
            <NoBoxButton
                className={className || "Project-container"}
                onClick={onClick}
            >
                {projectName}
            </NoBoxButton>
        );
    }
}
