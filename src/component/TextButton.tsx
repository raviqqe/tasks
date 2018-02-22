import * as React from "react";

import "./style/TextButton.css";

interface IProps {
    className?: string;
    icon?: JSX.Element;
    onClick: () => void;
}

export default class extends React.Component<IProps> {
    public render() {
        const { children, className, icon, onClick } = this.props;

        return (
            <button className={className || "TextButton"} onClick={onClick}>
                {icon}
                {children}
            </button>
        );
    }
}
