import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import * as React from "react";
import { GoMarkGithub } from "react-icons/go";
import { MdSettings, MdSync, MdSyncDisabled } from "react-icons/md";
import { connect } from "react-redux";

import config from "../config";
import * as authentication from "../state/authentication";
import * as settings from "../state/settings";
import * as tasks from "../state/tasks";
import { grey, yellowGreen } from "../style/colors";
import CreateProject from "./CreateProject";
import DeleteProject from "./DeleteProject";
import IconedButton from "./IconedButton";
import Link from "./Link";
import ModalWindowButton from "./ModalWindowButton";
import RenameProject from "./RenameProject";
import SettingsItem from "./SettingsItem";

import "./style/Settings.css";

interface IProps
  extends Partial<
      authentication.IActionCreators &
        authentication.IState &
        settings.IActionCreators &
        settings.IState &
        tasks.IActionCreators &
        tasks.IState
    > {}

@connect(
  ({ authentication, settings, tasks }) => ({
    ...authentication,
    ...settings,
    ...tasks
  }),
  {
    ...authentication.actionCreators,
    ...settings.actionCreators,
    ...tasks.actionCreators
  }
)
export default class extends React.Component<IProps> {
  public render() {
    const {
      alarmVolume,
      currentProjectName,
      notificationOn,
      removeProject,
      renameProject,
      setAlarmVolume,
      signedIn,
      signIn,
      signOut
    } = this.props;

    return (
      <ModalWindowButton
        buttonComponent={({ opened, openWindow }) => (
          <div
            className="Settings-icon"
            data-active={opened}
            onClick={openWindow}
          >
            <MdSettings />
          </div>
        )}
      >
        <div className="Settings">
          <SettingsItem label="Projects">
            <div className="Settings-buttons">
              <CreateProject />
              <RenameProject />
              <DeleteProject />
            </div>
          </SettingsItem>
          <SettingsItem label="Remote Sync">
            <div className="Settings-buttons">
              {signedIn ? (
                <IconedButton
                  backgroundColor={grey}
                  icon={<MdSyncDisabled />}
                  onClick={signOut}
                >
                  disable
                </IconedButton>
              ) : (
                <IconedButton
                  backgroundColor={yellowGreen}
                  icon={<MdSync />}
                  onClick={signIn}
                >
                  enable
                </IconedButton>
              )}
            </div>
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
                trackStyle={{ backgroundColor: yellowGreen }}
                dotStyle={{ background: grey, borderColor: grey }}
                activeDotStyle={{
                  background: yellowGreen,
                  borderColor: yellowGreen
                }}
                handleStyle={{
                  background: yellowGreen,
                  borderColor: yellowGreen,
                  boxShadow: "none"
                }}
                onChange={setAlarmVolume}
              />
            </div>
          </SettingsItem>
          <SettingsItem label="Notification">
            {notificationOn ? (
              <div className="Settings-notification-enabled">enabled</div>
            ) : (
              <div className="Settings-notification-disabled">disabled</div>
            )}
          </SettingsItem>
          <div className="footer">
            <Link href={config.repositoryUrl}>
              <div className="Settings-github-link">
                <GoMarkGithub /> GitHub
              </div>
            </Link>
          </div>
        </div>
      </ModalWindowButton>
    );
  }
}
