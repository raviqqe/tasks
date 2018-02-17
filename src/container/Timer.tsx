import numeral = require("numeral");
import * as React from "react";
import Square = require("react-icons/lib/md/stop");
import { connect } from "react-redux";

import Button from "../component/Button";
import { ITask } from "../domain/task";
import * as notification from "../infra/notification";
import { actionCreators as tasksActionCreators } from "../state/tasks";
import { actionCreators as timerActionCreators } from "../state/timer";

import "./style/Timer.css";

const workSeconds = 25 * 60;
const restSeconds = 5 * 60;

interface IProps {
    currentTask: ITask;
    playAlarm: () => void;
    toggleTimer: () => void;
    modifyTask: (task: ITask) => void;
}

interface IState {
    rest: boolean;
    seconds: number;
}

class Timer extends React.Component<IProps, IState> {
    public state: IState = { rest: false, seconds: workSeconds };
    private timer: NodeJS.Timer;

    public componentDidMount() {
        this.timer = setInterval(
            () => this.setState({ seconds: Math.max(this.state.seconds - 1, 0) }),
            1000);
    }

    public componentWillUnmount() {
        clearInterval(this.timer);
    }

    public componentDidUpdate(_, { seconds }: IState) {
        if (seconds !== 0 && this.state.seconds === 0) {
            this.props.playAlarm();
            notification.notify(this.state.rest ? "Break finished." : "1 pomodoro finished.");

            if (!this.state.rest) {
                this.saveSpentTime();
                this.setState({ rest: true, seconds: restSeconds });
            }
        }
    }

    public render() {
        const { rest, seconds } = this.state;

        return (
            <div className="Timer" data-rest={rest}>
                <div className="time" data-rest={rest}>
                    <div className="minutes">
                        {Math.floor(seconds / 60)}
                    </div>
                    <div className="seconds">
                        {numeral(seconds % 60).format("00")}
                    </div>
                </div>
                <Button
                    className="button"
                    onClick={() => {
                        if (!rest) {
                            this.saveSpentTime();
                        }

                        this.props.toggleTimer();
                    }}
                >
                    <Square />
                </Button>
            </div>
        );
    }

    private saveSpentTime = () => {
        const { currentTask, modifyTask } = this.props;

        modifyTask({
            ...currentTask,
            spentSeconds: currentTask.spentSeconds + workSeconds - this.state.seconds,
        });
    }
}

export default connect(null, { ...tasksActionCreators, ...timerActionCreators })(Timer);
