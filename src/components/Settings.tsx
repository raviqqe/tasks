import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import React, { Component } from "react";
import { GoMarkGithub } from "react-icons/go";
import { MdSettings, MdSync, MdSyncDisabled } from "react-icons/md";
import { connect } from "react-redux";
import styled, { css } from "styled-components";

import config from "../config";
import * as authentication from "../state/authentication";
import * as settings from "../state/settings";
import * as tasks from "../state/tasks";
import { shortDuration } from "../style/animation";
import { grey, lightGrey, yellowGreen } from "../style/colors";
import { verticalMargin } from "../style/margin";
import { withWindowSmall } from "../style/media";
import ArchiveProject from "./ArchiveProject";
import CreateProject from "./CreateProject";
import DeleteProject from "./DeleteProject";
import IconedButton from "./IconedButton";
import Link from "./Link";
import ModalWindowButton from "./ModalWindowButton";
import RenameProject from "./RenameProject";
import SettingsItem from "./SettingsItem";
import UnarchiveProject from "./UnarchiveProject";

const Settings = styled.div`
  ${verticalMargin("2em")};
  font-size: 1.2em;
  width: 60em;
  max-width: 100%;
  padding: 8vmin 10vmin;

  ${withWindowSmall(css`
    padding: 7vmin;
  `)};
`;

const Icon = styled.div<{ active: boolean }>`
  font-size: 2em;
  cursor: pointer;

  > svg {
    transition: transform ${shortDuration};
    transform: rotate(${({ active }) => (active ? "90deg" : "0deg")});
  }
`;

const Buttons = styled.div`
  font-size: 0.9em;
  display: flex;
  align-items: center;

  > * {
    margin: 0 0.25em;
  }

  ${withWindowSmall(css`
    ${verticalMargin("0.5em")};
    flex-direction: column;
    align-items: stretch;
  `)};
`;

const VolumeSlider = styled.div`
  max-width: 50%;
  padding: 0 0.5em 0.5em;
  width: 15em;
`;

const Notification = styled.div<{ on: boolean }>`
  color: ${({ on }) => (on ? yellowGreen : grey)};
  font-weight: bold;
  padding: 0 0.5em;
`;

const Footer = styled.div`
  font-size: 0.95em;
  border-top: 1px solid ${lightGrey};
  padding-top: 1em;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;

  > * {
    margin: 0 0.6em;
  }

  ${withWindowSmall(css`
    justify-content: flex-start;
  `)};
`;

const GitHubLink = styled.div`
  display: flex;
  align-items: center;

  > svg {
    font-size: 1.2em;
    margin-right: 0.3em;
  }
`;

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
export default class extends Component<IProps> {
  public render() {
    const {
      alarmVolume,
      notificationOn,
      setAlarmVolume,
      signedIn,
      signIn,
      signOut
    } = this.props;

    return (
      <ModalWindowButton
        buttonComponent={({ opened, openWindow }) => (
          <Icon active={opened} onClick={openWindow}>
            <MdSettings />
          </Icon>
        )}
      >
        <Settings>
          <SettingsItem label="Current Project">
            <Buttons>
              <CreateProject />
              <RenameProject />
              <ArchiveProject />
              <DeleteProject />
            </Buttons>
          </SettingsItem>
          <SettingsItem label="Archived Projects">
            <Buttons>
              <UnarchiveProject />
            </Buttons>
          </SettingsItem>
          <SettingsItem label="Remote Sync">
            <Buttons>
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
            </Buttons>
          </SettingsItem>
          <SettingsItem label="Alarm volume">
            <VolumeSlider>
              <Slider
                min={0}
                max={1}
                defaultValue={0.5}
                value={alarmVolume}
                step={0.125}
                marks={{ 0: "", 0.25: "", 0.5: "", 0.75: "", 1: "" }}
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
            </VolumeSlider>
          </SettingsItem>
          <SettingsItem label="Notification">
            <Notification on={notificationOn}>
              {notificationOn ? "On" : "Off"}
            </Notification>
          </SettingsItem>
          <Footer>
            <Link href={config.repositoryUrl}>
              <GitHubLink>
                <GoMarkGithub /> GitHub
              </GitHubLink>
            </Link>
          </Footer>
        </Settings>
      </ModalWindowButton>
    );
  }
}
