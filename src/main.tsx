import "@fontsource/chelsea-market";
import "@fontsource/roboto";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app/components/App.js";
import { globalStyle } from "./app/components/style.js";
import { errorReporter } from "./main/error-reporter.js";

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
