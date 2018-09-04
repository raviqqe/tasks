import * as React from "react";
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

export default (
  props: Pick<
    React.HTMLProps<HTMLInputElement>,
    Exclude<keyof React.HTMLProps<HTMLInputElement>, "ref" | "onChange">
  > & {
    innerRef?: React.RefObject<HTMLInputElement>;
    onChange?: React.EventHandler<React.ChangeEvent<HTMLInputElement>>;
  }
) => <Input {...props} />;
