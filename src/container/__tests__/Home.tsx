import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { createStore } from "../../state";
import Home from "../Home";

test("Render", () => {
  const { persistor, store } = createStore();

  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Home />
      </PersistGate>
    </Provider>,
    document.createElement("div")
  );
});
