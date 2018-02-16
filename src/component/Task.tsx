import numeral = require("numeral");
import * as React from "react";
import Clock = require("react-icons/lib/md/access-time");
import Check = require("react-icons/lib/md/check");
import Trash = require("react-icons/lib/md/delete");
import Repeat = require("react-icons/lib/md/replay");
import { connect } from "react-redux";

import { ITask } from "../domain/task";
import { actionCreators as tasksActionCreators } from "../state/tasks";
import { actionCreators as timerActionCreators } from "../state/timer";
import ItemName from "./ItemName";
import LabeledDate from "./LabeledDate";
import SubInformation from "./SubInformation";
import TaskDescription from "./TaskDescription";
import TaskLike from "./TaskLike";

import "./style/Task.css";

interface IProps extends ITask {
    detailed: boolean;
    done: boolean;
    highlighted?: boolean;
    modifyTask: (task: ITask) => void;
    toggleTaskState: (id: string) => void;
    removeTask: (id: string) => void;
    setCurrentTaskId: (id: string | null) => void;
    toggleTimer: () => void;
}

interface IState {
    showButtons: boolean;
}

class Task extends React.Component<IProps, IState> {
    public state: IState = { showButtons: false };

    public render() {
        const {
            createdAt, detailed, description, id, highlighted, name, setCurrentTaskId,
            spentSeconds, updatedAt, modifyTask,
        } = this.props;

        return (
            <TaskLike
                onClick={detailed ? undefined : () => setCurrentTaskId(id)}
                onMouseOver={() => this.setState({ showButtons: true })}
                onMouseOut={() => this.setState({ showButtons: false })}
            >
                <div className="Task-header">
                    <ItemName
                        highlighted={highlighted}
                        onEdit={detailed && ((name) => modifyTask({ ...this.task, name }))}
                        text={name}
                    />
                    {this.buttons}
                </div>
                {detailed && [
                    <TaskDescription
                        key="description"
                        text={description}
                        onEdit={(description) => modifyTask({ ...this.task, description })}
                    />,
                    this.renderSpentSeconds(),
                    <LabeledDate key="createdAt" label="Created on" timeStamp={createdAt} />,
                    <LabeledDate key="updatedAt" label="Updated on" timeStamp={updatedAt} />,
                ]}
            </TaskLike>
        );
    }

    private get task(): ITask {
        const { createdAt, description, id, name, spentSeconds, updatedAt } = this.props;
        return { createdAt, description, id, name, spentSeconds, updatedAt };
    }

    private renderSpentSeconds = () => {
        const minutes: number = this.props.spentSeconds / 60;
        const time: string = minutes < 60
            ? `${numeral(minutes).format("0")} mins`
            : `${numeral(minutes / 60).format("0[.]0")} hours`;

        return (
            <SubInformation key="spentTime">
                Spent for: {time}
            </SubInformation>
        );
    }

    private get buttons() {
        const { detailed, done, id, removeTask, toggleTaskState } = this.props;

        const buttons: JSX.Element[] = [];

        if (!done || detailed) {
            buttons.push(
                <div
                    key="toggleState"
                    className="Task-button"
                    onClick={(event) => {
                        toggleTaskState(id);
                        event.stopPropagation();
                    }}
                >
                    {done ? <Repeat /> : <Check />}
                </div>,
            );
        }

        if (!done) {
            buttons.push(
                <div
                    key="turnOnTimer"
                    className="Task-button"
                    onClick={(event) => {
                        this.props.setCurrentTaskId(this.task.id);
                        this.props.toggleTimer();
                        event.stopPropagation();
                    }}
                >
                    <Clock />
                </div>);
        }

        if (done || detailed) {
            buttons.push(
                <div
                    key="trash"
                    className="Task-button"
                    onClick={(event) => {
                        removeTask(id);
                        event.stopPropagation();
                    }}
                >
                    <Trash />
                </div>,
            );
        }

        return (
            <div className={"Task-buttons" + (this.state.showButtons ? "" : "-hidden")}>
                {buttons}
            </div>
        );
    }
}

export default connect(null, { ...tasksActionCreators, ...timerActionCreators })(Task);
