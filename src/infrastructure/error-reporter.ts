export interface ErrorReporter {
  report(error: unknown): void;
}
