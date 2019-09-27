import styled from "styled-components";
import { boxShadow } from "./style";

export const Button = styled.button<{ secondary?: boolean }>`
  ${boxShadow};
  background: ${({ secondary }) => (secondary ? "grey" : "indianred")}
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: inherit;
  color: white;
  border: none;
  cursor: pointer;
  flex-shrink: 0;
`;
