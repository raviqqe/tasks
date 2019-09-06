export interface IErrorReporter {
  report(error: Error): void;
}
