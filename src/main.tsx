import "@fontsource/chelsea-market";
import "@fontsource/roboto";
import { errorReporter } from "./main/error-reporter.js";
import { render } from "react-dom";

try {
  const element = document.getElementById("root");

  if (!element) {
    throw new Error("no root element");
  }

  render(
      <StrictMode>
        <style className={globalStyle} />
        <App {...this.props} />
      </StrictMode>,
    )
} catch (error) {
  errorReporter.report(error);
}
