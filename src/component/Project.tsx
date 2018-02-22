import * as React from "react";

import TextButton from "./TextButton";

interface IProps {
    disabled?: boolean;
    name: string;
    onClick: () => void;
}

export default class Project extends React.Component<IProps> {
    public render() {
        const { disabled, name, onClick } = this.props;

        return (
            <TextButton disabled={disabled} onClick={onClick}>
                {name}
            </TextButton>
        );
    }
}
