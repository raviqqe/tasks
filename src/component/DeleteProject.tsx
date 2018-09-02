import * as React from "react";
import { MdDelete } from "react-icons/md";
import { connect } from "react-redux";

import * as tasks from "../state/tasks";
import { grey } from "../style/colors";
import IconedButton from "./IconedButton";
import ModalWindowButton from "./ModalWindowButton";

import "./style/DeleteProject.css";

@connect(
  ({ tasks }) => tasks,
  tasks.actionCreators
)
export default class extends React.Component<
  Partial<tasks.IState & tasks.IActionCreators>
> {
  public render() {
    const { currentProjectName, removeProject } = this.props;

    return (
      <ModalWindowButton
        buttonComponent={({ openWindow }) => (
          <IconedButton
            backgroundColor={grey}
            icon={<MdDelete />}
            onClick={openWindow}
          >
            delete
          </IconedButton>
        )}
      >
        {closeWindow => (
          <div className="DeleteProject">
            <div className="message">
              Are you sure to delete "{currentProjectName}" project?
            </div>
            <IconedButton
              icon={<MdDelete />}
              onClick={() => {
                removeProject(currentProjectName);
                closeWindow();
              }}
            >
              delete
            </IconedButton>
          </div>
        )}
      </ModalWindowButton>
    );
  }
}
