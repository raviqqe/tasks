export function getUnixTimeStamp(): number {
  return Date.now() / 1000;
}

export function unixTimeStampToString(timeStamp: number): string {
  return new Date(1000 * timeStamp).toLocaleDateString();
}
