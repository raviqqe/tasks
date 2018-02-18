import * as React from "react";
import Done = require("react-icons/lib/md/check-box");
import Todo = require("react-icons/lib/md/check-box-outline-blank");
import Sort = require("react-icons/lib/md/sort");
import { connect } from "react-redux";

import CreateTask from "./CreateTask";
import IconedButton from "./IconedButton";
import NoBoxButton from "./NoBoxButton";
import ProjectsMenu from "./ProjectsMenu";
import Settings from "./Settings";
import "./style/Menu.css";

interface IProps {
    done: boolean;
    pointerAvailable: boolean;
    makeTaskListSortable: () => void;
    onTasksStateChange: (done: boolean) => void;
}

class Menu extends React.Component<IProps> {
    public render() {
        const { done, pointerAvailable, makeTaskListSortable, onTasksStateChange } = this.props;

        return (
            <div className="Menu" onClick={(event) => event.stopPropagation()}>
                <div className="upper">
                    <div className="background" />
                    <div className="content">
                        <ProjectsMenu />
                    </div>
                </div>
                <div className="lower">
                    <div className="background" />
                    <div className="content">
                        <div className="main">
                            <div className="states">
                                <NoBoxButton
                                    className={"state" + (done ? "" : "-highlighted")}
                                    icon={<Todo />}
                                    onClick={() => onTasksStateChange(false)}
                                >
                                    todo
                                </NoBoxButton>
                                <NoBoxButton
                                    className={"state" + (done ? "-highlighted" : "")}
                                    icon={<Done />}
                                    onClick={() => onTasksStateChange(true)}
                                >
                                    done
                                </NoBoxButton>
                            </div>
                            {!done && <CreateTask />}
                            {!pointerAvailable &&
                                <IconedButton
                                    className="sort-button"
                                    icon={<Sort />}
                                    onClick={makeTaskListSortable}
                                >
                                    sort
                                </IconedButton>}
                        </div>
                        <Settings />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(({ environment }) => environment)(Menu);
