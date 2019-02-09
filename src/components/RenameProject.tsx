import React, { RefObject, useRef, useState } from "react";
import { MdEdit } from "react-icons/md";
import { connect } from "react-redux";
import styled from "styled-components";

import { IGlobalState } from "../state";
import * as tasks from "../state/tasks";
import { normalBorder } from "../style/borders";
import { grey } from "../style/colors";
import IconedButton from "./IconedButton";
import Input from "./Input";
import ModalWindowButton from "./ModalWindowButton";

const Form = styled.form`
  ${normalBorder};
  background: white;
  padding: 1em;
  font-size: 1.2em;
`;

const RenameProject = ({
  currentProjectName,
  renameCurrentProject
}: tasks.IState & tasks.IActionCreators) => {
  const [name, setName] = useState("");
  const input: RefObject<HTMLInputElement> = useRef(null);

  return (
    <ModalWindowButton
      buttonComponent={({ openWindow }) => (
        <IconedButton
          backgroundColor={grey}
          icon={<MdEdit />}
          onClick={openWindow}
        >
          rename
        </IconedButton>
      )}
      onOpen={() => {
        if (input.current) {
          input.current.focus();
        }

        setName(currentProjectName);
      }}
    >
      {closeWindow => (
        <Form
          onSubmit={event => {
            renameCurrentProject(name.trim());
            setName("");
            closeWindow();
            event.preventDefault();
          }}
        >
          <Input
            onChange={({ target: { value } }) => setName(value)}
            placeholder="Name"
            ref={input}
            value={name}
          />
        </Form>
      )}
    </ModalWindowButton>
  );
};

export default connect(
  ({ tasks }: IGlobalState) => tasks,
  tasks.actionCreators
)(RenameProject);
