import { createGlobalStyle, css } from "styled-components";
import { green, black } from "./colors";

export const GlobalStyle = createGlobalStyle`
  body {
    background: ${green};
    margin: 0;
    padding: 0;
    color: ${black};
    font-family: Roboto, sans-serif;
    line-height: 1.4;
    font-size: 16px;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }
`;

export const boxShadow = css`
  box-shadow: 0rem 0.2rem 0.2rem rgba(0, 0, 0, 0.2);
`;

export const buttonMargin = "7.5rem";
