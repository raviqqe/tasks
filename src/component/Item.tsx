import * as React from "react";
import Check = require("react-icons/lib/md/check");
import Trash = require("react-icons/lib/md/delete");
import Repeat = require("react-icons/lib/md/replay");

import { ITask } from "../domain/task";
import ItemLike from "./ItemLike";
import ItemName from "./ItemName";
import "./style/Item.css";

interface IProps {
    buttons?: any[];
    detailed: boolean;
    details?: any;
    done: boolean;
    highlighted?: boolean;
    item: ITask;
    onEditName?: (name: string) => void;
    removeTask: (id: string) => void;
    setCurrentTaskId: (id: string | null) => void;
    toggleTaskState: (id: string) => void;
}

interface IState {
    showButtons: boolean;
}

export default class extends React.Component<IProps, IState> {
    public state: IState = { showButtons: false };

    public render() {
        const { detailed, details, highlighted, item, onEditName, setCurrentTaskId }
            = this.props;

        return (
            <ItemLike
                onClick={detailed ? undefined : () => setCurrentTaskId(item.id)}
                onMouseOver={() => this.setState({ showButtons: true })}
                onMouseOut={() => this.setState({ showButtons: false })}
            >
                <div className="Item-header">
                    <ItemName
                        highlighted={highlighted}
                        onEdit={onEditName}
                        text={item.name}
                    />
                    {this.buttons}
                </div>
                {detailed && details}
            </ItemLike>
        );
    }

    private get buttons() {
        const { detailed, done, item, removeTask, toggleTaskState } = this.props;

        const buttons: JSX.Element[] = [];

        if (!done || detailed) {
            buttons.push(
                <div
                    key="toggleState"
                    className="Item-button"
                    onClick={(event) => {
                        toggleTaskState(item.id);
                        event.stopPropagation();
                    }}
                >
                    {done ? <Repeat /> : <Check />}
                </div>,
            );
        }

        if (!done && this.props.buttons) {
            buttons.push(...this.props.buttons);
        }

        if (done || detailed) {
            buttons.push(
                <div
                    key="trash"
                    className="Item-button"
                    onClick={(event) => {
                        removeTask(item.id);
                        event.stopPropagation();
                    }}
                >
                    <Trash />
                </div>,
            );
        }

        return (
            <div className={"Item-buttons" + (this.state.showButtons ? "" : "-hidden")}>
                {buttons}
            </div>
        );
    }
}
