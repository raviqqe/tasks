import numeral = require("numeral");
import * as React from "react";
import { MdCropSquare } from "react-icons/md";
import { connect } from "react-redux";
import styled from "styled-components";

import Button from "../component/Button";
import { ITask } from "../domain/task";
import * as notification from "../infra/notification";
import * as tasks from "../state/tasks";
import * as timer from "../state/timer";
import { black } from "../style/colors";
import { windowSmallQuery } from "../style/media";

const workSeconds = 25 * 60;
const restSeconds = 5 * 60;

const Timer = styled.div<{ rest: boolean }>`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ rest }) => (rest ? "white" : "none")};
`;

const Time = styled.div<{ rest: boolean }>`
  color: ${({ rest }) => (rest ? black : "white")};
  font-size: 10em;
  display: flex;
  align-items: flex-end;

  @media ${windowSmallQuery} {
    font-size: 6em;
  }
`;

const Minutes = styled.div`
  font-size: 1.5em;
  margin-right: 0.1em;
`;

const Seconds = styled.div`
  padding-bottom: 0.15em;
`;

const TimerButton = styled(Button)`
  padding: 0.5em 2em;

  > svg {
    font-size: 2.5em;
  }
`;

interface IProps
  extends Partial<tasks.IActionCreators & timer.IActionCreators> {
  currentTask: ITask;
}

interface IState {
  rest: boolean;
  seconds: number;
}

@connect(
  null,
  { ...tasks.actionCreators, ...timer.actionCreators }
)
export default class extends React.Component<IProps, IState> {
  public state: IState = { rest: false, seconds: workSeconds };
  private timer: NodeJS.Timer;

  public componentDidMount() {
    this.timer = setInterval(
      () => this.setState({ seconds: Math.max(this.state.seconds - 1, 0) }),
      1000
    );
  }

  public componentWillUnmount() {
    clearInterval(this.timer);
  }

  public componentDidUpdate(_, { seconds }: IState) {
    if (seconds !== 0 && this.state.seconds === 0) {
      this.props.playAlarm();
      notification.notify(
        this.state.rest ? "Break finished." : "1 pomodoro finished."
      );

      if (!this.state.rest) {
        this.saveSpentTime();
        this.setState({ rest: true, seconds: restSeconds });
      }
    }
  }

  public render() {
    const { rest, seconds } = this.state;

    return (
      <Timer rest={rest}>
        <Time rest={rest}>
          <Minutes>{Math.floor(seconds / 60)}</Minutes>
          <Seconds>{numeral(seconds % 60).format("00")}</Seconds>
        </Time>
        <TimerButton
          onClick={() => {
            if (!rest) {
              this.saveSpentTime();
            }

            this.props.toggleTimer();
          }}
        >
          <MdCropSquare />
        </TimerButton>
      </Timer>
    );
  }

  private saveSpentTime = () => {
    const { currentTask, modifyTask } = this.props;

    modifyTask({
      ...currentTask,
      spentSeconds: currentTask.spentSeconds + workSeconds - this.state.seconds
    });
  };
}
