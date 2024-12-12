import "@fontsource/chelsea-market";
import "@fontsource/roboto";
import { errorReporter } from "./main/error-reporter.js";
import { StrictMode } from "react";
import { App } from "./infrastructure/react/App.js";
import { globalStyle } from "./infrastructure/react/style.js";
import { createRoot } from "react-dom/client";

try {
  const element = document.getElementById("root");

  if (!element) {
    throw new Error("no root element");
  }

  createRoot(element).render(
    <StrictMode>
      <style className={globalStyle} />
      <App />
    </StrictMode>,
  );
} catch (error) {
  errorReporter.report(error);
}
