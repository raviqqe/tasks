import React, { Component } from "react";
import { MdDelete } from "react-icons/md";
import { connect } from "react-redux";

import { IGlobalState } from "../state";
import * as tasks from "../state/tasks";
import { grey } from "../style/colors";
import IconedButton from "./IconedButton";

class DeleteProject extends Component<tasks.IState & tasks.IActionCreators> {
  public render() {
    const { currentProjectName, removeProject } = this.props;

    return (
      <IconedButton
        backgroundColor={grey}
        icon={<MdDelete />}
        onClick={() =>
          confirm(`Are you sure to delete "${currentProjectName}" project?`) &&
          removeProject(currentProjectName)
        }
      >
        delete
      </IconedButton>
    );
  }
}

export default connect(
  ({ tasks }: IGlobalState) => tasks,
  tasks.actionCreators
)(DeleteProject);
