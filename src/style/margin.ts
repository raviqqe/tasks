import { css, SimpleInterpolation } from "styled-components";

export function horizontalMargin(margin: string): SimpleInterpolation {
  return css`
    > * {
      margin-left: 0;
      margin-right: ${margin};

      &:last-child {
        margin-right: 0;
      }
    }
  `;
}

export function verticalMargin(margin: string): SimpleInterpolation {
  return css`
    > * {
      margin-top: 0;
      margin-bottom: ${margin};

      &:last-child {
        margin-bottom: 0;
      }
    }
  `;
}
