import * as React from "react";
import { connect } from "react-redux";

import { actionCreators } from "../state/message";

import "./style/Message.css";

interface IProps {
    clearMessage: () => void;
    error: boolean;
    message: string;
}

// Keep previous messages until they go away from screens.
interface IState {
    message: string;
}

class Message extends React.Component<IProps, IState> {
    public state: IState = { message: "" };

    public render() {
        const { clearMessage, error, message } = this.props;

        return (
            <div className="Message">
                <div
                    className="box"
                    data-error={error}
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
