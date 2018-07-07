import numeral = require("numeral");
import * as React from "react";
import Clock = require("react-icons/lib/md/access-time");
import Check = require("react-icons/lib/md/check");
import Trash = require("react-icons/lib/md/delete");
import Repeat = require("react-icons/lib/md/replay");
import { connect } from "react-redux";

import { ITask } from "../domain/task";
import { unixTimeStampToString } from "../domain/utils";
import * as tasks from "../state/tasks";
import * as timer from "../state/timer";
import SmallIconButton from "./SmallIconButton";
import SubInformation from "./SubInformation";
import TaskDescription from "./TaskDescription";
import TaskName from "./TaskName";

import "./style/Task.css";

interface IProps extends ITask, tasks.IActionCreators, timer.IActionCreators {
  detailed: boolean;
  done: boolean;
  highlighted?: boolean;
}

interface IState {
  showButtons: boolean;
}

class Task extends React.Component<IProps, IState> {
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
      spentSeconds,
      toggleTaskState,
      toggleTimer,
      updatedAt
    } = this.props;

    return (
      <div
        className="Task"
        onClick={detailed ? undefined : () => setCurrentTaskId(id)}
        onMouseOver={() => this.setState({ showButtons: true })}
        onMouseOut={() => this.setState({ showButtons: false })}
      >
        <div className="header">
          <TaskName
            highlighted={highlighted}
            onEdit={detailed && (name => modifyTask({ ...this.task, name }))}
            text={name}
          />
          <div className="buttons" data-hidden={!this.state.showButtons}>
            {(!done || detailed) && (
              <SmallIconButton onClick={() => toggleTaskState(id)}>
                {done ? <Repeat /> : <Check />}
              </SmallIconButton>
            )}
            {!done && (
              <SmallIconButton
                onClick={() => {
                  setCurrentTaskId(id);
                  toggleTimer();
                }}
              >
                <Clock />
              </SmallIconButton>
            )}
            {(done || detailed) && (
              <SmallIconButton onClick={() => removeTask(id)}>
                <Trash />
              </SmallIconButton>
            )}
          </div>
        </div>
        {detailed && (
          <React.Fragment>
            <TaskDescription
              text={description}
              onEdit={description => modifyTask({ ...this.task, description })}
            />
            <SubInformation>Spent for: {this.spentSeconds}</SubInformation>
            <SubInformation>
              Created on: {unixTimeStampToString(createdAt)}
            </SubInformation>
            <SubInformation>
              Updated on: {unixTimeStampToString(updatedAt)}
            </SubInformation>
          </React.Fragment>
        )}
      </div>
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

  private get spentSeconds(): string {
    const minutes: number = this.props.spentSeconds / 60;

    return minutes < 60
      ? `${numeral(minutes).format("0")} mins`
      : `${numeral(minutes / 60).format("0[.]0")} hours`;
  }
}

export default connect(
  null,
  { ...tasks.actionCreators, ...timer.actionCreators }
)(Task);
