import { css, InterpolationValue } from "styled-components";

export const windowSmallQuery = "(max-width: 768px)";
export const mouseAvailableQuery = "(any-pointer: fine)";

export function withWindowSmall(
  values: InterpolationValue[]
): InterpolationValue[] {
  return css`
    @media ${windowSmallQuery} {
      ${values};
    }
  `;
}

export function withWindowBig(
  values: InterpolationValue[]
): InterpolationValue[] {
  return css`
    @media not all and ${windowSmallQuery} {
      ${values};
    }
  `;
}

export function withMouseAvailable(
  values: InterpolationValue[]
): InterpolationValue[] {
  return css`
    @media ${mouseAvailableQuery} {
      ${values};
    }
  `;
}
