import styled from "styled-components";
import { boxShadow } from "./style/index.js";
import { red, grey, white } from "./style/colors.js";

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
