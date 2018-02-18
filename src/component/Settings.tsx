import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import * as React from "react";
import Gear = require("react-icons/lib/md/settings");
import { connect } from "react-redux";

import config from "../config";
// TODO: import { actionCreators as authenticationActionCreators } from "../redux/authentication";
import { actionCreators as settingsActionCreators } from "../state/settings";
import Button from "./Button";
import Link from "./Link";
import ModalWindowButton from "./ModalWindowButton";
import SettingsItem from "./SettingsItem";

import "./style/Settings.css";

const grey = "#bcc";
const green = "#9db634";

interface IProps {
    alarmVolume: number;
    notificationOn: boolean | null;
    setAlarmVolume: () => void;
}

class Settings extends React.Component<IProps> {
    public render() {
        const { alarmVolume, notificationOn, setAlarmVolume } = this.props;

        return (
            <ModalWindowButton
                buttonComponent={
                    ({ opened, openWindow }) =>
                        <div
                            className="Settings-icon"
                            data-active={opened}
                            onClick={openWindow}
                        >
                            <Gear />
                        </div>}
            >
                <div className="Settings">
                    <SettingsItem
                        label="Notification"
                        value={notificationOn
                            ? <div className="Settings-notification-enabled">enabled</div>
                            : <div className="Settings-notification-disabled">disabled</div>
                        }
                    />
                    <SettingsItem
                        label="Alarm volume"
                        value={
                            <div className="Settings-volume-slider">
                                <Slider
                                    min={0}
                                    max={1}
                                    defaultValue={0.5}
                                    value={alarmVolume}
                                    step={0.125}
                                    marks={{ 0: "0", 0.5: "0.5", 1: "1" }}
                                    railStyle={{ backgroundColor: grey }}
                                    trackStyle={{ backgroundColor: green }}
                                    dotStyle={{ background: grey, borderColor: grey }}
                                    activeDotStyle={{ background: green, borderColor: green }}
                                    handleStyle={{
                                        background: green,
                                        borderColor: green,
                                        boxShadow: "none",
                                    }}
                                    onChange={setAlarmVolume}
                                />
                            </div>
                        }
                    />
                    <div className="buttons">
                        <Button onClick={() => { /* TODO */ }}>Sign out</Button>
                        <Button className="negative-button" onClick={() => { /* TODO */ }}>
                            Delete account
                        </Button>
                    </div>
                    <div className="footer">
                        <Link href={config.repositoryUrl}>GitHub</Link>
                    </div>
                </div>
            </ModalWindowButton>
        );
    }
}

export default connect(
    ({ settings }) => settings,
    { /* TODO: ...authenticationActionCreators, */ ...settingsActionCreators },
)(Settings);
