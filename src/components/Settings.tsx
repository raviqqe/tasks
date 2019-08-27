import "rc-slider/assets/index.css";
import React, { Component } from "react";
import { GoMarkGithub } from "react-icons/go";
import { MdSettings, MdSync, MdSyncDisabled } from "react-icons/md";
import { connect } from "react-redux";
import styled, { css } from "styled-components";
import config from "../config";
import { IGlobalState } from "../state";
import * as authentication from "../state/authentication";
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

const Window = styled.div`
  ${verticalMargin("2em")};
  font-size: 1.1em;
  width: 55em;
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
  extends authentication.IActionCreators,
    authentication.IState,
    tasks.IActionCreators,
    tasks.IState {}

class Settings extends Component<IProps> {
  public render() {
    const { signedIn, signIn, signOut } = this.props;

    return (
      <ModalWindowButton
        buttonComponent={({ opened, openWindow }) => (
          <Icon active={opened} onClick={openWindow}>
            <MdSettings />
          </Icon>
        )}
      >
        <Window>
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
          <Footer>
            <Link href={config.repositoryUrl}>
              <GitHubLink>
                <GoMarkGithub /> GitHub
              </GitHubLink>
            </Link>
          </Footer>
        </Window>
      </ModalWindowButton>
    );
  }
}

export default connect(
  ({ authentication, tasks }: IGlobalState) => ({
    ...authentication,
    ...tasks
  }),
  {
    ...authentication.actionCreators,
    ...tasks.actionCreators
  }
)(Settings);
