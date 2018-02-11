import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "../app";

test("Render without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
});
