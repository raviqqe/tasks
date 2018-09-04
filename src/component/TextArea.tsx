import * as React from "react";
import AutosizedTextArea from "react-autosize-textarea";
import styled from "styled-components";

import { black, grey } from "../style/colors";

const TextArea = styled(AutosizedTextArea as any)`
  border: 1px solid ${grey};
  border-radius: 0.2rem;
  outline: none;
  padding: 0.2em;
  width: 100%;
  color: ${black};
  font: inherit;
`;

export default (
  props: Pick<
    React.HTMLProps<HTMLTextAreaElement>,
    Exclude<keyof React.HTMLProps<HTMLTextAreaElement>, "ref">
  >
) => <TextArea async={true} {...props} />;
