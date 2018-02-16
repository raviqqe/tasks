import * as React from "react";

import "./style/TaskLike.css";

interface IProps {
    className?: string;
    onClick?: () => void;
    onMouseOut?: () => void;
    onMouseOver?: () => void;
}

export default class extends React.Component<IProps> {
    public render() {
        const { children, className, onClick, onMouseOut, onMouseOver } = this.props;

        return (
            <div
                className={className || "TaskLike-container"}
                onClick={onClick}
                onMouseOut={onMouseOut}
                onMouseOver={onMouseOver}
            >
                {children}
            </div>
        );
    }
}
