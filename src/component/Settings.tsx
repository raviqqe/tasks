import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import * as React from "react";
import GitHub = require("react-icons/lib/go/mark-github");
import Gear = require("react-icons/lib/md/settings");
import { connect } from "react-redux";

import config from "../config";
import * as authentication from "../state/authentication";
import * as settings from "../state/settings";
import * as tasks from "../state/tasks";
import Button from "./Button";
import CreateProject from "./CreateProject";
import Link from "./Link";
import ModalWindowButton from "./ModalWindowButton";
import RenameProject from "./RenameProject";
import SettingsItem from "./SettingsItem";

import "./style/Settings.css";

const grey = "#bcc";
const green = "#9db634";

interface IProps extends
    authentication.IActionCreators, authentication.IState,
    settings.IActionCreators, settings.IState,
    tasks.IActionCreators, tasks.IState { }

class Settings extends React.Component<IProps> {
    public render() {
        const {
            alarmVolume, currentProjectName, notificationOn, removeProject,
            renameProject, setAlarmVolume, signedIn, signIn, signOut,
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
                            <CreateProject />
                            <RenameProject text={currentProjectName} onEdit={renameProject} />
                            <Button onClick={() => removeProject(currentProjectName)}>Delete</Button>
                        </div>
                    </SettingsItem>
                    <SettingsItem label="Remote Sync">
                        <div className="Settings-buttons">
                            {signedIn ?
                                <Button className="disable-button" onClick={signOut}>
                                    Disable
                                </Button> :
                                <Button className="enable-button" onClick={signIn}>
                                    Enable
                                </Button>}
                        </div>
                    </SettingsItem>
                    <div className="footer">
                        <Link href={config.repositoryUrl}>
                            <div className="Settings-github-link"><GitHub /> GitHub</div>
                        </Link>
                    </div>
                </div>
            </ModalWindowButton>
        );
    }
}

export default connect(
    ({ authentication, settings, tasks }) => ({ ...authentication, ...settings, ...tasks }),
    { ...authentication.actionCreators, ...settings.actionCreators, ...tasks.actionCreators },
)(Settings);
