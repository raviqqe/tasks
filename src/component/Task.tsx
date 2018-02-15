import numeral = require("numeral");
import * as React from "react";
import Clock = require("react-icons/lib/md/access-time");
import { connect } from "react-redux";

import { ITask } from "../domain/task";
import { actionCreators as tasksActionCreators } from "../state/tasks";
import { actionCreators as timerActionCreators } from "../state/timer";
import Item from "./Item";
import LabeledDate from "./LabeledDate";
import "./style/Task.css";
import SubInformation from "./SubInformation";
import TaskDescription from "./TaskDescription";

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

class Task extends React.Component<IProps> {
    public render() {
        const {
            createdAt, detailed, description, setCurrentTaskId,
            spentSeconds, updatedAt, modifyTask,
        } = this.props;

        return (
            <Item
                {...this.props}
                buttons={[
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
                    </div>,
                ]}
                details={[
                    <TaskDescription
                        key="description"
                        text={description}
                        onEdit={(description) => modifyTask({ ...this.task, description })}
                    />,
                    this.renderSpentSeconds(),
                    <LabeledDate key="createdAt" label="Created on" timeStamp={createdAt} />,
                    <LabeledDate key="updatedAt" label="Updated on" timeStamp={updatedAt} />,
                ]}
                item={this.task}
                onEditName={detailed && ((name) => modifyTask({ ...this.task, name }))}
            />
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
