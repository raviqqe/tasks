import { pickBy } from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import styled, { css } from "styled-components";

import * as tasks from "../state/tasks";
import { shortDuration } from "../style/animation";
import { normalBorder } from "../style/borders";
import { transparentBlack } from "../style/colors";
import { verticalMargin } from "../style/margin";
import { withWindowSmall } from "../style/media";
import TextButton from "./TextButton";

const CurrentProject = styled.div`
  color: white;
  cursor: pointer;
  font-size: 1.5em;
  padding: 1em;
  text-align: center;
  word-wrap: break-word;
`;

const Background = styled.div<{ covert: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  display: ${({ covert }) => (covert ? "none" : "unset")};

  ${withWindowSmall(css`
    left: unset;
    right: 0;
  `)};
`;

const boxMargin = "1em";

const Box = styled.div<{ covert: boolean }>`
  ${normalBorder};
  ${verticalMargin("1.6em")};
  background: white;
  padding: 1.5em 2em;
  position: absolute;
  left: ${boxMargin};
  top: ${boxMargin};
  max-width: calc(100vw - 2 * ${boxMargin});
  max-height: calc(100vh - 2 * ${boxMargin});
  overflow: auto;
  transform-origin: 0 0;
  transition: ${shortDuration};
  z-index: 200;
  box-shadow: 0.2rem 0.2rem 1rem ${transparentBlack};

  ${withWindowSmall(css`
    left: unset;
    right: ${boxMargin};
    transform-origin: 100% 0;
  `)};

  ${({ covert }) =>
    covert
      ? css`
          transform: scale(0, 0);
          opacity: 0;
          visibility: hidden;
        `
      : css``};
`;

const Projects = styled.div`
  font-size: 1.2em;
`;

interface IState {
  opened: boolean;
}

@connect(
  ({ tasks }) => tasks,
  tasks.actionCreators
)
export default class extends Component<
  Partial<tasks.IState & tasks.IActionCreators>,
  IState
> {
  public state: IState = { opened: false };

  public render() {
    const { currentProjectName, setCurrentProjectName } = this.props;
    const projects = pickBy(this.props.projects, ({ archived }) => !archived);
    const { opened } = this.state;

    return (
      <div>
        <CurrentProject onClick={() => this.setState({ opened: !opened })}>
          {currentProjectName}
        </CurrentProject>
        <Background
          covert={!opened}
          onClick={() => this.setState({ opened: false })}
        />
        <Box covert={!opened}>
          <Projects>
            {Object.keys(projects)
              .sort((x: string, y: string) =>
                x.toLowerCase().localeCompare(y.toLowerCase())
              )
              .map(name => (
                <TextButton
                  key={name}
                  disabled={name === currentProjectName}
                  onClick={() => {
                    setCurrentProjectName(name);
                    this.setState({ opened: false });
                  }}
                >
                  {name}
                </TextButton>
              ))}
          </Projects>
        </Box>
      </div>
    );
  }
}
