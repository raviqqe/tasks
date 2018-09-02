import waves = require("node-waves");
import "node-waves/dist/waves.css";
import * as React from "react";
import styled, { css } from "styled-components";

import { instantDuration } from "../style/animation";
import { red, transparentBlack } from "../style/colors";
import { mouseAvailableQuery } from "../style/media";

const shadowSize = "0.15rem";

const shadowOn = css`
  transform: translateY(-${shadowSize});
  box-shadow: 0 ${shadowSize} ${shadowSize} ${transparentBlack};
`;

interface IButtonProps {
  alwaysShadowed?: boolean;
  backgroundColor?: string;
}

const Button = styled.button<IButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  background: ${({ backgroundColor }) => backgroundColor || red};
  color: white;
  font: inherit;
  white-space: nowrap;
  padding: 0.4em 1em;
  border: none;
  border-radius: 0.5rem;
  transition: box-shadow ${instantDuration}, transform ${instantDuration};

  ${({ alwaysShadowed }) => (alwaysShadowed ? shadowOn : "")};

  @media ${mouseAvailableQuery} {
    &:hover {
      ${shadowOn};
    }
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
`;

interface IProps extends IButtonProps {
  onClick?: () => void;
  type?: string;
}

export default class extends React.Component<IProps> {
  private button: HTMLButtonElement;

  public render() {
    const { children, onClick, ...props } = this.props;

    return (
      <Button
        innerRef={button => (this.button = button)}
        onClick={
          onClick &&
          (event => {
            onClick();
            event.stopPropagation();
          })
        }
        {...props}
      >
        {children}
      </Button>
    );
  }

  public componentDidMount() {
    this.componentDidUpdate();
  }

  public componentDidUpdate() {
    if (this.button) {
      waves.attach(this.button, ["waves-light"]);
      waves.init();
    }
  }
}
