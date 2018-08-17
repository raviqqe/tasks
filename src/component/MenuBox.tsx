import * as React from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank, MdSort } from "react-icons/md";

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

export default ({
  done,
  pointerAvailable,
  makeTaskListSortable,
  onTasksStateChange
}: IProps) => (
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
              icon={<MdCheckBoxOutlineBlank />}
              onClick={() => onTasksStateChange(false)}
            >
              todo
            </TextButton>
            <TextButton
              disabled={done}
              icon={<MdCheckBox />}
              onClick={() => onTasksStateChange(true)}
            >
              done
            </TextButton>
          </div>
          {!done && <CreateTask />}
          {!pointerAvailable && (
            <IconedButton
              className="sort-button"
              icon={<MdSort />}
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
