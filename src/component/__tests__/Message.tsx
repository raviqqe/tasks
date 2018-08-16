import { mount, shallow } from "enzyme";
import * as React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { createStore } from "../../state";
import Message from "../Message";

test("Shallow mount", () => {
  const { store } = createStore();

  shallow(
    <Provider store={store}>
      <Message />
    </Provider>
  );
});

test("Mount", () => {
  const { persistor, store } = createStore();

  mount(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Message />
      </PersistGate>
    </Provider>
  );
});
