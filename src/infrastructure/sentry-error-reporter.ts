import * as sentry from "@sentry/browser";
import { IErrorReporter } from "./error-reporter.js";

export class SentryErrorReporter implements IErrorReporter {
  constructor(dsn: string) {
    sentry.init({ dsn });
  }

  public report(error: Error): void {
    sentry.captureException(error);
  }
}
