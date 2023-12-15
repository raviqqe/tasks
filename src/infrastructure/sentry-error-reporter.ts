import * as sentry from "@sentry/browser";
import { type ErrorReporter } from "./error-reporter.js";

export class SentryErrorReporter implements ErrorReporter {
  constructor(dsn: string) {
    sentry.init({ dsn });
  }

  public report(error: unknown): void {
    sentry.captureException(error);
  }
}
