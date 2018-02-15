import * as React from "react";

import NoBoxButton from "./NoBoxButton";
import "./style/ProjectButton.css";

interface IProps {
    className?: string;
    projectName: string;
    onClick: () => void;
}

export default class ProjectButton extends React.Component<IProps> {
    public render() {
        const { className, projectName, onClick } = this.props;

        return (
            <NoBoxButton
                className={className || "ProjectButton-container"}
                onClick={onClick}
            >
                {projectName}
            </NoBoxButton>
        );
    }
}
