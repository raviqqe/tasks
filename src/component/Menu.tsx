import * as React from "react";

import MenuBox from "./MenuBox";
import MenuButton, { IProps as IMenuButtonProps } from "./MenuButton";

interface IProps extends IMenuButtonProps {
    isSmallWindow: boolean;
}

export default class extends React.Component<IProps> {
    public render() {
        return this.props.isSmallWindow
            ? <MenuButton {...this.props} />
            : <MenuBox {...this.props} />;
    }
}
