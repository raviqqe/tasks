import configuration from "../configuration.json" with { type: "json" };
import { SentryErrorReporter } from "../infrastructure/sentry-error-reporter.js";

export const errorReporter = new SentryErrorReporter(configuration.sentry.dsn);
