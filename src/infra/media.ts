import { mouseAvailableQuery, windowSmallQuery } from "../style/media";

const widthQuery = matchMedia(windowSmallQuery);
const touchabilityQuery = matchMedia(`not all and ${mouseAvailableQuery}`);
const pointerQuery = matchMedia(mouseAvailableQuery);

export const windowSmall: boolean = !!widthQuery.matches;
export const touchable: boolean = !!touchabilityQuery.matches;
export const pointerAvailable: boolean = !!pointerQuery.matches;

export function onWindowSizeChange(
  callback: (windowSmall: boolean) => void
): void {
  widthQuery.addListener(({ matches }) => callback(!!matches));
}

export function onTouchabilityChange(
  callback: (touchable: boolean) => void
): void {
  touchabilityQuery.addListener(({ matches }) => callback(!!matches));
}

export function onPointerChange(
  callback: (pointerAvailable: boolean) => void
): void {
  pointerQuery.addListener(({ matches }) => callback(!!matches));
}
