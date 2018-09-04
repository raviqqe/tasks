import { css, injectGlobal } from "styled-components";

import { black, grey, lightGreen } from "./colors";
import { withWindowBig } from "./media";

// tslint:disable no-unused-expression
injectGlobal`
  @import url("https://fonts.googleapis.com/css?family=Noto+Sans");

  * {
    box-sizing: border-box;
    user-select: none;

    ${withWindowBig(css`
      &::-webkit-scrollbar {
        width: 0.7rem;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 1rem;
        background: ${grey};
      }
    `)}
  }

  body {
    background: ${lightGreen};
    margin: 0;
    padding: 0;
    color: ${black};
    font-family: "Noto Sans", sans-serif;
    line-height: 1.4;
    font-size: 14px;
  }

  .sortable-ghost {
    visibility: hidden;
  }
`;
