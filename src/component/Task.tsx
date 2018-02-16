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
import LabeledDate from "./LabeledDate";
import SmallIconButton from "./SmallIconButton";
import SubInformation from "./SubInformation";
import TaskDescription from "./TaskDescription";
import TaskName from "./TaskName";

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
            createdAt, detailed, description, done, id, highlighted, modifyTask,
            name, removeTask, setCurrentTaskId, spentSeconds, toggleTaskState,
            toggleTimer, updatedAt,
        } = this.props;

        return (
            <div
                className="Task-container"
                onClick={detailed ? undefined : () => setCurrentTaskId(id)}
                onMouseOver={() => this.setState({ showButtons: true })}
                onMouseOut={() => this.setState({ showButtons: false })}
            >
                <div className="Task-header">
                    <TaskName
                        highlighted={highlighted}
                        onEdit={detailed && ((name) => modifyTask({ ...this.task, name }))}
                        text={name}
                    />
                    <div className={"Task-buttons" + (this.state.showButtons ? "" : "-hidden")}>
                        {(!done || detailed) &&
                            <SmallIconButton onClick={() => toggleTaskState(id)}>
                                {done ? <Repeat /> : <Check />}
                            </SmallIconButton>}
                        {!done &&
                            <SmallIconButton
                                onClick={() => {
                                    setCurrentTaskId(id);
                                    toggleTimer();
                                }}
                            >
                                <Clock />
                            </SmallIconButton>}
                        {(done || detailed) &&
                            <SmallIconButton onClick={() => removeTask(id)}>
                                <Trash />
                            </SmallIconButton>}
                    </div>
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
            </div>
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
}

export default connect(null, { ...tasksActionCreators, ...timerActionCreators })(Task);
