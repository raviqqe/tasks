import React, { useState } from "react";
import { MdCheck, MdDelete, MdReplay } from "react-icons/md";
import { connect } from "react-redux";
import { mapProps } from "recompose";
import styled, { css } from "styled-components";
import { ITask } from "../domain/task";
import * as tasks from "../state/tasks";
import { delayForUX, instantDuration } from "../style/animation";
import { normalBorder } from "../style/borders";
import { horizontalMargin, verticalMargin } from "../style/margin";
import { withWindowSmall } from "../style/media";
import SmallIconButton from "./SmallIconButton";
import TaskDescription from "./TaskDescription";
import TaskName from "./TaskName";

const Content = styled.div`
  ${normalBorder};
  ${verticalMargin("0.6em")};
  background: white;
  padding: 0.5em 0.7em;
`;

const Header = styled.div`
  ${horizontalMargin("1em")};
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Buttons = styled.div<{ covert: boolean }>`
  ${horizontalMargin("0.2em")};
  display: flex;
  align-items: center;
  transition: ${instantDuration};

  ${({ covert }) =>
    covert
      ? css`
          opacity: 0;
          visibility: hidden;

          ${withWindowSmall(css`
            opacity: 1;
            visibility: visible;
          `)};
        `
      : css``};
`;

interface IProps extends ITask, tasks.IActionCreators {
  detailed?: boolean;
  done: boolean;
  highlighted?: boolean;
}

const Task = ({
  createdAt,
  detailed,
  description,
  done,
  id,
  highlighted,
  modifyTask,
  name,
  removeTask,
  setCurrentTaskId,
  spentSeconds,
  toggleTaskState,
  updatedAt
}: IProps) => {
  const task: ITask = {
    createdAt,
    description,
    id,
    name,
    spentSeconds,
    updatedAt
  };
  const [buttonsShown, showButtons] = useState(false);

  return (
    <Content
      onClick={detailed ? undefined : () => setCurrentTaskId(id)}
      onMouseOver={() => showButtons(true)}
      onMouseOut={() => showButtons(false)}
    >
      <Header>
        <TaskName
          highlighted={highlighted}
          onEdit={detailed ? name => modifyTask({ ...task, name }) : undefined}
        >
          {name}
        </TaskName>
        <Buttons covert={!buttonsShown}>
          {(!done || detailed) && (
            <SmallIconButton onClick={() => toggleTaskState(id)}>
              {done ? <MdReplay /> : <MdCheck />}
            </SmallIconButton>
          )}
          {(done || detailed) && (
            <SmallIconButton
              onClick={() => {
                if (
                  window.confirm(
                    `Are you sure to delete the task of "${name}"?`
                  )
                ) {
                  removeTask(id);
                }
              }}
            >
              <MdDelete />
            </SmallIconButton>
          )}
        </Buttons>
      </Header>
      {detailed && (
        <>
          <TaskDescription
            onEdit={description => modifyTask({ ...task, description })}
          >
            {description}
          </TaskDescription>
        </>
      )}
    </Content>
  );
};

export default connect(
  null,
  tasks.actionCreators
)(
  mapProps(({ removeTask, toggleTaskState, ...props }: IProps) => ({
    removeTask: (id: string) => delayForUX(() => removeTask(id)),
    toggleTaskState: (id: string) => delayForUX(() => toggleTaskState(id)),
    ...props
  }))(Task)
);
