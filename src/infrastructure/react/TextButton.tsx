import { defaultImport } from "default-import";
import defaultStyled from "styled-components";
import { Button } from "./Button.js";

const styled = defaultImport(defaultStyled);

export const TextButton = styled(Button)`
  padding: 0.5em 1em;
  font-size: 1.2em;
  border-radius: 0.5em;
`;
