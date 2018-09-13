export const instantDuration = "0.05s";
export const shortDuration = "0.1s";
export const longDuration = "0.2s";
export const maxDurationMs = 200;

export function delayForUX(callback: () => void): void {
  setTimeout(callback, 20);
}
