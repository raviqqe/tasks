import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./container/app";

import "./index.css";

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js");
}
