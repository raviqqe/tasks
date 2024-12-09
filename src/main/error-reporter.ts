import { SentryErrorReporter } from "../infrastructure/sentry-error-reporter.js";
import configuration from "../configuration.json" with { type: "json" };

export const errorReporter = new SentryErrorReporter(configuration.sentry.dsn);
