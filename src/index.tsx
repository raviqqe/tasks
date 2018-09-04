import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import Message from "./components/Message";
import config from "./config";
import Home from "./containers/Home";
import { createStore } from "./state";
import "./style";

const { persistor, store } = createStore();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Home />
      <Message />
    </PersistGate>
  </Provider>,
  document.getElementById(config.rootId) as HTMLElement
);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js");
}
