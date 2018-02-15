import * as React from "react";

import NoBoxButton from "./NoBoxButton";
import "./style/ProjectButton.css";

interface IProps {
    className?: string;
    projectName: string;
    setCurrentProjectName: (name: string) => void;
}

export default class ProjectButton extends React.Component<IProps> {
    public render() {
        const { className, projectName, setCurrentProjectName } = this.props;

        return (
            <NoBoxButton
                className={className || "ProjectButton-container"}
                onClick={() => setCurrentProjectName(name)}
            >
                {projectName}
            </NoBoxButton>
        );
    }
}
