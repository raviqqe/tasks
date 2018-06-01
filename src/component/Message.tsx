import * as React from "react";
import { connect } from "react-redux";

import * as message from "../state/message";

import "./style/Message.css";

// Keep previous messages until they go away from screens.
interface IState {
    message: string;
}

class Message extends React.Component<message.IState & message.IActionCreators, IState> {
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

export default connect(({ message }) => message, message.actionCreators)(Message);
