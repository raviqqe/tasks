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
import "./style/ItemsMenu.css";

interface IProps {
    done: boolean;
    pointerAvailable: boolean;
    makeTaskListSortable: () => void;
    onTasksStateChange: (done: boolean) => void;
}

class ItemsMenu extends React.Component<IProps> {
    public render() {
        const { done, pointerAvailable, makeTaskListSortable, onTasksStateChange } = this.props;

        return (
            <div className="ItemsMenu-container" onClick={(event) => event.stopPropagation()}>
                <div className="ItemsMenu-upper-container">
                    <div className="ItemsMenu-upper-background" />
                    <div className="ItemsMenu-upper-content">
                        <ProjectsMenu />
                    </div>
                </div>
                <div className="ItemsMenu-lower-container">
                    <div className="ItemsMenu-lower-background" />
                    <div className="ItemsMenu-lower-content">
                        <div className="ItemsMenu-lower-upper-container">
                            <div className="ItemsMenu-states">
                                <NoBoxButton
                                    className={!done && "ItemsMenu-state-highlighted"}
                                    icon={<Todo />}
                                    onClick={() => onTasksStateChange(false)}
                                >
                                    todo
                                </NoBoxButton>
                                <NoBoxButton
                                    className={done && "ItemsMenu-state-highlighted"}
                                    icon={<Done />}
                                    onClick={() => onTasksStateChange(true)}
                                >
                                    done
                                </NoBoxButton>
                            </div>
                            {!done && <CreateTask />}
                            {!pointerAvailable &&
                                <IconedButton
                                    className="ItemsMenu-sort-button"
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

export default connect(({ environment }) => environment)(ItemsMenu);
