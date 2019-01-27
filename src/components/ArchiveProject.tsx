import React, { Component } from "react";
import { MdArchive } from "react-icons/md";
import { connect } from "react-redux";

import { IGlobalState } from "../state";
import * as tasks from "../state/tasks";
import { grey } from "../style/colors";
import IconedButton from "./IconedButton";

class ArchiveProject extends Component<tasks.IState & tasks.IActionCreators> {
  public render() {
    const { archiveProject, currentProjectName } = this.props;

    return (
      <IconedButton
        backgroundColor={grey}
        icon={<MdArchive />}
        onClick={() =>
          confirm(`Are you sure to archive "${currentProjectName}" project?`) &&
          archiveProject(currentProjectName)
        }
      >
        archive
      </IconedButton>
    );
  }
}

export default connect(
  ({ tasks }: IGlobalState) => tasks,
  tasks.actionCreators
)(ArchiveProject);
