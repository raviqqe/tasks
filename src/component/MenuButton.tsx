import * as React from "react";
import Menu = require("react-icons/lib/md/menu");

import CircleButton from "./CircleButton";
import ModalButton, { IButtonProps, IContentProps } from "./ModalButton";
import "./style/MenuButton.css";

interface IProps {
    closed?: boolean;
    hidden?: boolean;
    itemsMenu: JSX.Element;
}

export default class extends React.Component<IProps> {
    public render() {
        const { closed, itemsMenu } = this.props;

        return (
            <ModalButton
                buttonComponent={this.buttonComponent}
                closed={closed}
                contentComponent={this.contentComponent}
                transitionClassNames="MenuButton-menu-container"
            />
        );
    }

    private buttonComponent = ({ openWindow }: IButtonProps): JSX.Element => (
        <div className={"MenuButton-button-container" + (this.props.hidden ? "-hidden" : "")}>
            <CircleButton
                className="MenuButton-button"
                onClick={openWindow}
            >
                <Menu />
            </CircleButton>
        </div>
    )

    private contentComponent = ({ closeWindow }: IContentProps): JSX.Element => (
        <div className="MenuButton-menu-container" onClick={closeWindow} >
            {this.props.itemsMenu}
        </div>
    )
}
