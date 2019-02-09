import React from "react";
import { MdDelete } from "react-icons/md";
import { connect } from "react-redux";

import { IGlobalState } from "../state";
import * as tasks from "../state/tasks";
import { grey } from "../style/colors";
import IconedButton from "./IconedButton";

const DeleteProject = ({
  currentProjectName,
  removeProject
}: tasks.IState & tasks.IActionCreators) => (
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

export default connect(
  ({ tasks }: IGlobalState) => tasks,
  tasks.actionCreators
)(DeleteProject);
