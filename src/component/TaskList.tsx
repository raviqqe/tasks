import * as React from "react";
import sortable = require("sortablejs");

import { ITask } from "../domain/task";
import ModalWindowButton from "./ModalWindowButton";
import Task from "./Task";

import "./style/TaskList.css";

interface IProps {
    currentTaskId: string | null;
    done: boolean;
    isSmallWindow: boolean;
    tasks: ITask[];
    setTasks: (tasks: ITask[]) => void;
    sorting?: boolean;
    style?: { [key: string]: any };
}

export default class extends React.Component<IProps> {
    private sortable;
    private container: HTMLElement;

    public render() {
        const { currentTaskId, done, isSmallWindow, tasks, setTasks, sorting, style }
            = this.props;

        if (tasks.length === 0) {
            return <div className="TaskList-message" style={style}>There is no item.</div>;
        }

        return (
            <div
                ref={(container) => this.container = container}
                className={"TaskList-container" + (sorting ? "-shadowed" : "")}
                style={style}
            >
                {tasks.map((item) =>
                    isSmallWindow ?
                        <ModalWindowButton
                            key={item.id}
                            buttonComponent={this.ClickableTask}
                            buttonProps={{ done, item }}
                        >
                            <Task detailed={true} done={done} {...item} />
                        </ModalWindowButton> :
                        <Task
                            key={item.id}
                            done={done}
                            highlighted={item.id === currentTaskId}
                            {...item}
                        />)}
            </div>
        );
    }

    public componentDidMount() {
        this.componentDidUpdate();
    }

    public componentDidUpdate() {
        const { done, setTasks } = this.props;

        if (this.container && !this.sortable) {
            this.sortable = sortable.create(this.container, {
                animation: 200,
                ghostClass: "TaskList-placeholder",
                onSort: ({ oldIndex, newIndex }) => {
                    const tasks = [...this.props.tasks];
                    tasks.splice(newIndex, 0, tasks.splice(oldIndex, 1)[0]);
                    setTasks(tasks);
                },
                scroll: true,
            });
        }
    }

    private ClickableTask = ({ done, openWindow, item }) => {
        return (
            <div onClick={openWindow}>
                <Task done={done} {...item} />
            </div>
        );
    }
}
