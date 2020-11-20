export function formatErrorMessage(error: Error): string {
  const message: string = error.message;

  if (!message[0]) {
    throw new Error("error message empty");
  }

  return message[0].toUpperCase() + message.slice(1) + "!";
}
