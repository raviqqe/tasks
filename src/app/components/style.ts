import { css } from "@linaria/core";

export const black = "#222";
export const green = "darkseagreen";
export const grey = "grey";
export const lightGrey = "lightgrey";
export const red = "indianred";
export const white = "white";

export const globalStyle = css`
  :global() {
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
  }
`;

export const boxShadow = {
  boxShadow: "0rem 0.2rem 0.2rem rgba(0, 0, 0, 0.2)",
};

export const buttonMargin = "7.5rem";
