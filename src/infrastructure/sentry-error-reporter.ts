import * as sentry from "@sentry/browser";
import { type IErrorReporter } from "./error-reporter.js";

export class SentryErrorReporter implements IErrorReporter {
  constructor(dsn: string) {
    sentry.init({ dsn });
  }

  public report(error: unknown): void {
    sentry.captureException(error);
  }
}
