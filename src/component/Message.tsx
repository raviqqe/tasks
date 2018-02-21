import * as React from "react";
import { connect } from "react-redux";

import { actionCreators, IActionCreators, IState as IMessageState } from "../state/message";

import "./style/Message.css";

interface IProps extends IActionCreators, IMessageState { }

// Keep previous messages until they go away from screens.
interface IState {
    message: string;
}

class Message extends React.Component<IProps, IState> {
    public state: IState = { message: "" };

    public render() {
        const { clearMessage, message } = this.props;

        return (
            <div className="Message">
                <div
                    className="box"
                    data-hidden={!message}
                    onClick={clearMessage}
                >
                    {this.state.message}
                </div>
            </div>
        );
    }

    public componentWillUpdate({ message }) {
        if (message && message !== this.state.message) {
            this.setState({ message });
        }
    }
}

export default connect(({ message }) => message, actionCreators)(Message);
