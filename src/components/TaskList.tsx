import React, { Component } from "react";
import sortable = require("sortablejs");
import styled, { css } from "styled-components";

import { ITask } from "../domain/task";
import { instantDuration } from "../style/animation";
import { transparentBlack } from "../style/colors";
import { withWindowSmall } from "../style/media";
import ModalWindowButton from "./ModalWindowButton";
import Task from "./Task";

const List = styled.div<{ shadowed: boolean }>`
  overflow-y: auto;
  height: 100%;
  padding: 0.5em;

  ${withWindowSmall(css`
    padding-bottom: 5em;
  `)};

  > * {
    transition: box-shadow ${instantDuration}, transform ${instantDuration};
    margin: 0.5em;
    ${({ shadowed }) =>
      !shadowed
        ? css``
        : css`
            box-shadow: 0 0.2em 0.2em ${transparentBlack};
            transform: translateY(-0.2em);
          `};
  }
`;

const Message = styled.div`
  padding: 1em;
`;

interface IProps {
  currentTaskId: string | null;
  done: boolean;
  fixed?: boolean;
  windowSmall: boolean;
  tasks: ITask[];
  setTasks: (tasks: ITask[]) => void;
  sorting?: boolean;
}

export default class extends Component<IProps> {
  private sortable;
  private container: HTMLElement;

  public render() {
    const { currentTaskId, done, windowSmall, tasks, sorting } = this.props;

    if (tasks.length === 0) {
      return <Message>There is no task.</Message>;
    }

    return (
      <List
        ref={container => (this.container = container)}
        shadowed={!!sorting}
      >
        {tasks.map(task =>
          windowSmall ? (
            <ModalWindowButton
              key={task.id}
              buttonComponent={props => (
                <this.ClickableTask done={done} task={task} {...props} />
              )}
            >
              <Task detailed={true} done={done} {...task} />
            </ModalWindowButton>
          ) : (
            <Task
              key={task.id}
              done={done}
              highlighted={task.id === currentTaskId}
              {...task}
            />
          )
        )}
      </List>
    );
  }

  public componentDidMount() {
    this.componentDidUpdate();
  }

  public componentDidUpdate() {
    const { fixed, setTasks } = this.props;

    if (this.container && !this.sortable) {
      this.sortable = sortable.create(this.container, {
        animation: 200,
        onSort: ({ oldIndex, newIndex }) => {
          const tasks = [...this.props.tasks];
          tasks.splice(newIndex, 0, tasks.splice(oldIndex, 1)[0]);
          setTasks(tasks);
        },
        scroll: true
      });
    }

    if (this.sortable) {
      this.sortable.option("disabled", fixed);
    }
  }

  private ClickableTask = ({ done, openWindow, task }) => {
    return (
      <div onClick={openWindow}>
        <Task done={done} {...task} />
      </div>
    );
  };
}
