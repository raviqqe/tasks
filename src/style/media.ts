import { css, SimpleInterpolation } from "styled-components";

export const windowSmallQuery = "(max-width: 768px)";
export const mouseAvailableQuery = "(any-pointer: fine)";

export function withWindowSmall(
  interpolation: SimpleInterpolation
): SimpleInterpolation {
  return css`
    @media ${windowSmallQuery} {
      ${interpolation};
    }
  `;
}

export function withWindowBig(
  interpolation: SimpleInterpolation
): SimpleInterpolation {
  return css`
    @media not all and ${windowSmallQuery} {
      ${interpolation};
    }
  `;
}

export function withMouseAvailable(
  interpolation: SimpleInterpolation
): SimpleInterpolation {
  return css`
    @media ${mouseAvailableQuery} {
      ${interpolation};
    }
  `;
}
