import { css, injectGlobal } from "styled-components";

import { black, grey, lightGreen } from "./colors";
import { windowSmallQuery } from "./media";

export const sharpBorderRadius = css`
  border-radius: 0.2rem;
`;

const fontWithoutSize = css`
  color: ${black};
  font-family: "Noto Sans", sans-serif;
  line-height: 1.4;
`;

const font = css`
  ${fontWithoutSize};
  font-size: 14px;
`;

// tslint:disable no-unused-expression
injectGlobal`
  @import url("https://fonts.googleapis.com/css?family=Noto+Sans");

  * {
    box-sizing: border-box;
    user-select: none;

    @media not all and ${windowSmallQuery} {
      &::-webkit-scrollbar {
        width: 0.7rem;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 1rem;
        background: ${grey};
      }
    }
  }

  body {
    background: ${lightGreen};
    margin: 0;
    padding: 0;
    ${font};
  }

  input,
  textarea {
    border: 1px solid ${grey};
    ${sharpBorderRadius};
    outline: none;
    padding: 0.2em;
    width: 100%;
    ${font};

    &:focus {
      ${fontWithoutSize};
    }
  }

  .sortable-ghost {
    visibility: hidden;
  }
`;
