import numeral = require("numeral");
import React, { Component } from "react";
import { MdAccessTime, MdCheck, MdDelete, MdReplay } from "react-icons/md";
import { connect } from "react-redux";
import styled, { css } from "styled-components";

import { ITask } from "../domain/task";
import { unixTimeStampToString } from "../domain/utils";
import * as tasks from "../state/tasks";
import * as timer from "../state/timer";
import { instantDuration } from "../style/animation";
import { normalBorder } from "../style/borders";
import { horizontalMargin, verticalMargin } from "../style/margin";
import { withWindowSmall } from "../style/media";
import SmallIconButton from "./SmallIconButton";
import SubInformation from "./SubInformation";
import TaskDescription from "./TaskDescription";
import TaskName from "./TaskName";

const Task = styled.div`
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

interface IProps
  extends ITask,
    Partial<tasks.IActionCreators & timer.IActionCreators> {
  detailed?: boolean;
  done: boolean;
  highlighted?: boolean;
}

interface IState {
  showButtons: boolean;
}

@connect(
  null,
  { ...tasks.actionCreators, ...timer.actionCreators }
)
export default class extends Component<IProps, IState> {
  public state: IState = { showButtons: false };

  public render() {
    const {
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
      toggleTaskState,
      toggleTimer,
      updatedAt
    } = this.props;

    return (
      <Task
        onClick={detailed ? undefined : () => setCurrentTaskId(id)}
        onMouseOver={() => this.setState({ showButtons: true })}
        onMouseOut={() => this.setState({ showButtons: false })}
      >
        <Header>
          <TaskName
            highlighted={highlighted}
            onEdit={detailed && (name => modifyTask({ ...this.task, name }))}
            text={name}
          />
          <Buttons covert={!this.state.showButtons}>
            {(!done || detailed) && (
              <SmallIconButton onClick={() => toggleTaskState(id)}>
                {done ? <MdReplay /> : <MdCheck />}
              </SmallIconButton>
            )}
            {!done && (
              <SmallIconButton
                onClick={() => {
                  setCurrentTaskId(id);
                  toggleTimer();
                }}
              >
                <MdAccessTime />
              </SmallIconButton>
            )}
            {(done || detailed) && (
              <SmallIconButton onClick={() => removeTask(id)}>
                <MdDelete />
              </SmallIconButton>
            )}
          </Buttons>
        </Header>
        {detailed && (
          <>
            <TaskDescription
              text={description}
              onEdit={description => modifyTask({ ...this.task, description })}
            />
            <SubInformation>Spent for: {this.spentTime}</SubInformation>
            <SubInformation>
              Created on: {unixTimeStampToString(createdAt)}
            </SubInformation>
            <SubInformation>
              Updated on: {unixTimeStampToString(updatedAt)}
            </SubInformation>
          </>
        )}
      </Task>
    );
  }

  private get task(): ITask {
    const {
      createdAt,
      description,
      id,
      name,
      spentSeconds,
      updatedAt
    } = this.props;

    return { createdAt, description, id, name, spentSeconds, updatedAt };
  }

  private get spentTime(): string {
    const minutes: number = this.props.spentSeconds / 60;

    return minutes < 60
      ? `${numeral(minutes).format("0")} mins`
      : `${numeral(minutes / 60).format("0[.]0")} hours`;
  }
}
