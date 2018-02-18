import * as React from "react";
import Hamburger = require("react-icons/lib/md/menu");

import CircleButton from "./CircleButton";
import Menu from "./Menu";
import ModalButton, { IButtonProps, IContentProps } from "./ModalButton";
import "./style/MenuButton.css";

interface IProps {
    closed?: boolean;
    done: boolean;
    hidden?: boolean;
    makeTaskListSortable: () => void;
    onTasksStateChange: (done: boolean) => void;
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
        <div className={"MenuButton-button" + (this.props.hidden ? "-hidden" : "")}>
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
            <Menu {...this.props} />
        </div>
    )
}
