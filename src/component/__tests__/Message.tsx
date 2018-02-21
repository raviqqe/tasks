import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { createStore } from "../../state";
import Message from "../Message";

test("Render", () => {
    const { persistor, store } = createStore();

    ReactDOM.render(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Message />
            </PersistGate>
        </Provider>,
        document.createElement("div"));
});
