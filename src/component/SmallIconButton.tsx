import * as React from "react";

import "./style/SmallIconButton.css";

interface IProps {
    onClick: () => void;
}

export default class extends React.Component<IProps> {
    public render() {
        const { children, onClick } = this.props;

        return (
            <div
                className="SmallIconButton-container"
                onClick={(event) => {
                    onClick();
                    event.stopPropagation();
                }}
            >
                {children}
            </div>
        );
    }
}
