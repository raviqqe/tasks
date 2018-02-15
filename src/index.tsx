import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import Message from "./component/Message";
import App from "./container/App";
import { createStore } from "./state";

import "./index.css";

const { persistor, store } = createStore();

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
            <Message />
        </PersistGate>
    </Provider>,
    document.getElementById("root") as HTMLElement,
);

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js");
}
