import * as React from "react";
import { MdDelete } from "react-icons/md";
import { connect } from "react-redux";
import styled from "styled-components";

import * as tasks from "../state/tasks";
import { normalBorder } from "../style/border";
import { grey } from "../style/colors";
import { verticalMargin } from "../style/margin";
import IconedButton from "./IconedButton";
import ModalWindowButton from "./ModalWindowButton";

const DeleteProject = styled.div`
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
          <DeleteProject>
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
          </DeleteProject>
        )}
      </ModalWindowButton>
    );
  }
}
