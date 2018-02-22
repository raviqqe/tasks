import * as React from "react";

import "./style/TextButton.css";

interface IProps {
    disabled?: boolean;
    icon?: JSX.Element;
    onClick: () => void;
}

export default class extends React.Component<IProps> {
    public render() {
        const { children, disabled, icon, onClick } = this.props;

        return (
            <button className="TextButton" data-disabled={disabled} onClick={onClick}>
                {icon}
                {children}
            </button>
        );
    }
}
