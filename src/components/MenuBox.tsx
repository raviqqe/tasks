import React from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank, MdSort } from "react-icons/md";
import styled, { css } from "styled-components";

import { grey, red } from "../style/colors";
import { verticalMargin } from "../style/margin";
import { withWindowSmall } from "../style/media";
import CreateTask from "./CreateTask";
import IconedButton from "./IconedButton";
import ProjectsMenu from "./ProjectsMenu";
import Settings from "./Settings";
import TextButton from "./TextButton";

const background = css`
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: -1;
  right: 0;

  ${withWindowSmall(css`
    left: 0;
    right: unset;
  `)};
`;

const column = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  > * {
    flex-shrink: 0;
  }
`;

const MenuBox = styled.div`
  ${column};
  width: 12em;
  max-width: 100%;
  height: 100%;
`;

const UpperBox = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const UpperBackground = styled.div`
  ${background};
  background: ${red};
  bottom: 0;
`;

const LowerBox = styled.div`
  flex: 1;
  display: flex;
  position: relative;
`;

const LowerBackground = styled.div`
  ${background};
  background: white;
  top: 0;
`;

const Content = styled.div`
  ${column};
  ${verticalMargin("2em")};
  align-items: center;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 1.5em;
`;

const Main = styled.div`
  ${column};
  ${verticalMargin("2em")};
  align-items: center;
  width: 100%;
`;

const States = styled.div`
  ${column};
`;

export interface IProps {
  done: boolean;
  makeTaskListSortable: () => void;
  changeTasksState: (done: boolean) => void;
  pointerAvailable: boolean;
}

export default ({
  done,
  pointerAvailable,
  makeTaskListSortable,
  changeTasksState
}: IProps) => (
  <MenuBox onClick={event => event.stopPropagation()}>
    <UpperBox>
      <UpperBackground />
      <ProjectsMenu />
    </UpperBox>
    <LowerBox>
      <LowerBackground />
      <Content>
        <Main>
          <States>
            <TextButton
              disabled={!done}
              icon={<MdCheckBoxOutlineBlank />}
              onClick={() => changeTasksState(false)}
            >
              todo
            </TextButton>
            <TextButton
              disabled={done}
              icon={<MdCheckBox />}
              onClick={() => changeTasksState(true)}
            >
              done
            </TextButton>
          </States>
          {!done && <CreateTask />}
          {!pointerAvailable && (
            <IconedButton
              backgroundColor={grey}
              icon={<MdSort />}
              onClick={makeTaskListSortable}
            >
              sort
            </IconedButton>
          )}
        </Main>
        <Settings />
      </Content>
    </LowerBox>
  </MenuBox>
);
