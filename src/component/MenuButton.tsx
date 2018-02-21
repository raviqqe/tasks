import * as React from "react";
import Hamburger = require("react-icons/lib/md/menu");

import CircleButton from "./CircleButton";
import MenuBox, { IProps as IMenuBoxProps } from "./MenuBox";
import ModalButton, { IButtonProps, IContentProps } from "./ModalButton";

import "./style/MenuButton.css";

export interface IProps extends IMenuBoxProps {
    closed?: boolean;
    hidden?: boolean;
}

export default class extends React.Component<IProps> {
    public render() {
        return (
            <ModalButton
                buttonComponent={this.buttonComponent}
                closed={this.props.closed}
                contentComponent={this.contentComponent}
                transitionClassNames="MenuButton-menu"
            />
        );
    }

    private buttonComponent = ({ openWindow }: IButtonProps): JSX.Element => (
        <div className="MenuButton-button-container" data-hidden={this.props.hidden}>
            <CircleButton
                className="MenuButton-button"
                onClick={openWindow}
            >
                <Hamburger />
            </CircleButton>
        </div>
    )

    private contentComponent = ({ closeWindow }: IContentProps): JSX.Element => (
        <div className="MenuButton-menu" onClick={closeWindow} >
            <MenuBox {...this.props} />
        </div>
    )
}
