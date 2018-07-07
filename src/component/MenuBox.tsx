import * as React from "react";
import Done = require("react-icons/lib/md/check-box");
import Todo = require("react-icons/lib/md/check-box-outline-blank");
import Sort = require("react-icons/lib/md/sort");

import CreateTask from "./CreateTask";
import IconedButton from "./IconedButton";
import ProjectsMenu from "./ProjectsMenu";
import Settings from "./Settings";
import TextButton from "./TextButton";

import "./style/MenuBox.css";

export interface IProps {
  done: boolean;
  makeTaskListSortable: () => void;
  onTasksStateChange: (done: boolean) => void;
  pointerAvailable: boolean;
}

export default class extends React.Component<IProps> {
  public render() {
    const {
      done,
      pointerAvailable,
      makeTaskListSortable,
      onTasksStateChange
    } = this.props;

    return (
      <div className="MenuBox" onClick={event => event.stopPropagation()}>
        <div className="upper">
          <div className="background" />
          <ProjectsMenu />
        </div>
        <div className="lower">
          <div className="background" />
          <div className="content">
            <div className="main">
              <div className="states">
                <TextButton
                  disabled={!done}
                  icon={<Todo />}
                  onClick={() => onTasksStateChange(false)}
                >
                  todo
                </TextButton>
                <TextButton
                  disabled={done}
                  icon={<Done />}
                  onClick={() => onTasksStateChange(true)}
                >
                  done
                </TextButton>
              </div>
              {!done && <CreateTask />}
              {!pointerAvailable && (
                <IconedButton
                  className="sort-button"
                  icon={<Sort />}
                  onClick={makeTaskListSortable}
                >
                  sort
                </IconedButton>
              )}
            </div>
            <Settings />
          </div>
        </div>
      </div>
    );
  }
}
