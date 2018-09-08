import React, { ChangeEvent, EventHandler, HTMLProps, RefObject } from "react";
import styled from "styled-components";

import { black, grey } from "../style/colors";
import { Omit } from "../utils";

const Input = styled.input`
  border-radius: 0.2rem;
  border: 1px solid ${grey};
  color: ${black};
  font: inherit;
  outline: none;
  padding: 0.2em;
  width: 100%;
`;

export default ({
  onChange,
  ...props
}: Omit<HTMLProps<HTMLInputElement>, "ref" | "onChange"> & {
  innerRef?: RefObject<HTMLInputElement>;
  onChange?: EventHandler<ChangeEvent<HTMLInputElement>>;
}) => (
  <Input
    {...props}
    onChange={(event: ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        event.target.value = event.target.value.trim();
        onChange(event);
      }
    }}
  />
);
