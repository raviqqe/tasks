import React, { forwardRef, InputHTMLAttributes } from "react";
import styled from "styled-components";
import { black, grey } from "../style/colors";

const Input = styled.input`
  border-radius: 0.2rem;
  border: 1px solid ${grey};
  color: ${black};
  font: inherit;
  outline: none;
  padding: 0.2em;
  width: 100%;
`;

export default forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>((props, ref) => <Input {...props} ref={ref} />);
