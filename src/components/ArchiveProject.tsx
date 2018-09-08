import React, { Component } from "react";
import { MdArchive } from "react-icons/md";
import { connect } from "react-redux";
import styled from "styled-components";

import * as tasks from "../state/tasks";
import { normalBorder } from "../style/borders";
import { grey } from "../style/colors";
import { verticalMargin } from "../style/margin";
import IconedButton from "./IconedButton";
import ModalWindowButton from "./ModalWindowButton";

const ArchiveProject = styled.div`
  ${normalBorder};
  ${verticalMargin("1em")};
  background: white;
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.2em;
`;

@connect(
  ({ tasks }) => tasks,
  tasks.actionCreators
)
export default class extends Component<
  Partial<tasks.IState & tasks.IActionCreators>
> {
  public render() {
    const { archiveProject, currentProjectName } = this.props;

    return (
      <ModalWindowButton
        buttonComponent={({ openWindow }) => (
          <IconedButton
            backgroundColor={grey}
            icon={<MdArchive />}
            onClick={openWindow}
          >
            archive
          </IconedButton>
        )}
      >
        {closeWindow => (
          <ArchiveProject>
            <div>Are you sure to archive "{currentProjectName}" project?</div>
            <IconedButton
              icon={<MdArchive />}
              onClick={() => {
                archiveProject(currentProjectName);
                closeWindow();
              }}
            >
              archive
            </IconedButton>
          </ArchiveProject>
        )}
      </ModalWindowButton>
    );
  }
}
