import * as React from "react";
import Trash = require("react-icons/lib/md/delete");
import { connect } from "react-redux";

import * as tasks from "../state/tasks";
import IconedButton from "./IconedButton";
import ModalWindowButton from "./ModalWindowButton";

import "./style/DeleteProject.css";

class DeleteProject extends React.Component<
  tasks.IState & tasks.IActionCreators
> {
  public render() {
    const { currentProjectName, removeProject } = this.props;

    return (
      <ModalWindowButton
        buttonComponent={({ openWindow }) => (
          <IconedButton
            className="DeleteProject-button"
            icon={<Trash />}
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
              icon={<Trash />}
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

export default connect(
  ({ tasks }) => tasks,
  tasks.actionCreators
)(DeleteProject);
