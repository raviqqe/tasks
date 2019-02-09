import React, { RefObject, useRef, useState } from "react";
import { MdAdd } from "react-icons/md";
import { connect } from "react-redux";
import styled from "styled-components";

import * as tasks from "../state/tasks";
import { normalBorder } from "../style/borders";
import IconedButton from "./IconedButton";
import Input from "./Input";
import ModalWindowButton from "./ModalWindowButton";

const Form = styled.form`
  ${normalBorder};
  background: white;
  padding: 1em;
  font-size: 1.2em;
`;

const CreateProject = ({ addProject }: tasks.IActionCreators) => {
  const input: RefObject<HTMLInputElement> = useRef(null);
  const [name, setName] = useState("");

  return (
    <ModalWindowButton
      buttonComponent={({ openWindow }) => (
        <IconedButton icon={<MdAdd />} onClick={openWindow}>
          add
        </IconedButton>
      )}
      onOpen={() => input.current && input.current.focus()}
    >
      {closeWindow => (
        <Form
          onSubmit={event => {
            addProject(name.trim());
            setName("");
            closeWindow();
            event.preventDefault();
          }}
        >
          <Input
            ref={input}
            onChange={({ target: { value } }) => setName(value)}
            placeholder="Name"
            value={name}
          />
        </Form>
      )}
    </ModalWindowButton>
  );
};

export default connect(
  null,
  tasks.actionCreators
)(CreateProject);
