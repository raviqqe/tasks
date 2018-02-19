import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import * as React from "react";
import Gear = require("react-icons/lib/md/settings");
import { connect } from "react-redux";

import config from "../config";
import { actionCreators as authenticationActionCreators } from "../state/authentication";
import { actionCreators as settingsActionCreators } from "../state/settings";
import { actionCreators as tasksActionCreators } from "../state/tasks";
import Button from "./Button";
import Link from "./Link";
import ModalWindowButton from "./ModalWindowButton";
import RenameProject from "./RenameProject";
import SettingsItem from "./SettingsItem";

import "./style/Settings.css";

const grey = "#bcc";
const green = "#9db634";

interface IProps {
    alarmVolume: number;
    currentProjectName: string;
    deleteAccount: () => void;
    notificationOn: boolean | null;
    removeProject: (name: string) => void;
    setAlarmVolume: () => void;
    signedIn: boolean;
    signIn: () => void;
    signOut: () => void;
}

class Settings extends React.Component<IProps> {
    public render() {
        const {
            alarmVolume, currentProjectName, deleteAccount, notificationOn,
            removeProject, setAlarmVolume, signedIn, signIn, signOut,
        } = this.props;

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
                    <SettingsItem label="Notification">
                        {notificationOn
                            ? <div className="Settings-notification-enabled">enabled</div>
                            : <div className="Settings-notification-disabled">disabled</div>}
                    </SettingsItem>
                    <SettingsItem label="Alarm volume">
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
                    </SettingsItem>
                    <SettingsItem label="Current Project">
                        <div className="Settings-buttons">
                            <RenameProject />
                            <Button onClick={() => removeProject(currentProjectName)}>Delete</Button>
                        </div>
                    </SettingsItem>
                    <SettingsItem label="Remote Sync">
                        <div className="Settings-buttons">
                            {signedIn ?
                                <React.Fragment>
                                    <Button className="sign-out-button" onClick={signOut}>
                                        Sign out
                                    </Button>
                                    <Button onClick={deleteAccount}>
                                        Delete account
                                    </Button>
                                </React.Fragment> :
                                <Button className="sign-in-button" onClick={signIn}>
                                    Sign in
                                </Button>}
                        </div>
                    </SettingsItem>
                    <div className="footer">
                        <Link href={config.repositoryUrl}>GitHub</Link>
                    </div>
                </div>
            </ModalWindowButton>
        );
    }
}

export default connect(
    ({ authentication, settings, tasks }) => ({ ...authentication, ...settings, ...tasks }),
    { ...authenticationActionCreators, ...settingsActionCreators, ...tasksActionCreators },
)(Settings);
