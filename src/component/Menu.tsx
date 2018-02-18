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
                <div className="Menu-upper">
                    <div className="Menu-upper-background" />
                    <div className="Menu-upper-content">
                        <ProjectsMenu />
                    </div>
                </div>
                <div className="Menu-lower">
                    <div className="Menu-lower-background" />
                    <div className="Menu-lower-content">
                        <div className="Menu-lower-upper">
                            <div className="Menu-states">
                                <NoBoxButton
                                    className={!done && "Menu-state-highlighted"}
                                    icon={<Todo />}
                                    onClick={() => onTasksStateChange(false)}
                                >
                                    todo
                                </NoBoxButton>
                                <NoBoxButton
                                    className={done && "Menu-state-highlighted"}
                                    icon={<Done />}
                                    onClick={() => onTasksStateChange(true)}
                                >
                                    done
                                </NoBoxButton>
                            </div>
                            {!done && <CreateTask />}
                            {!pointerAvailable &&
                                <IconedButton
                                    className="Menu-sort-button"
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
