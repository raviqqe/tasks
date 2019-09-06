export function formatErrorMessage(error: Error): string {
  const message: string = error.message;
  return message[0].toUpperCase() + message.slice(1) + "!";
}
