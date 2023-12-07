import { defaultImport } from "default-import";
import { styled } from "@linaria/react";
import { red, grey, white } from "./style/colors.js";
import { boxShadow } from "./style.js";



export const Button = styled.button<{ secondary?: boolean }>`
  ${boxShadow};
  background: ${({ secondary }) => (secondary ? grey : red)};
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: inherit;
  color: ${white};
  border: none;
  cursor: pointer;
  flex-shrink: 0;
`;
