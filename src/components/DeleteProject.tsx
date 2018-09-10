import React, { Component } from "react";
import { MdDelete } from "react-icons/md";
import { connect } from "react-redux";
import styled from "styled-components";

import { IGlobalState } from "../state";
import * as tasks from "../state/tasks";
import { normalBorder } from "../style/borders";
import { grey } from "../style/colors";
import { verticalMargin } from "../style/margin";
import IconedButton from "./IconedButton";
import ModalWindowButton from "./ModalWindowButton";

const Window = styled.div`
  ${normalBorder};
  ${verticalMargin("1em")};
  background: white;
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.2em;
`;

class DeleteProject extends Component<tasks.IState & tasks.IActionCreators> {
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
          <Window>
            <div>Are you sure to delete "{currentProjectName}" project?</div>
            <IconedButton
              icon={<MdDelete />}
              onClick={() => {
                removeProject(currentProjectName);
                closeWindow();
              }}
            >
              delete
            </IconedButton>
          </Window>
        )}
      </ModalWindowButton>
    );
  }
}

export default connect(
  ({ tasks }: IGlobalState) => tasks,
  tasks.actionCreators
)(DeleteProject);
