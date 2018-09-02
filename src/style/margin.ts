import { css, InterpolationValue } from "styled-components";

export function verticalMargin(margin: string): InterpolationValue[] {
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
