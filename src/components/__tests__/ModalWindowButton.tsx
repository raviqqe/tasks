import { mount, shallow } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { createStore } from "../../state";
import ModalWindowButton from "../ModalWindowButton";

test("Shallow mount", () => {
  const { store } = createStore();

  shallow(
    <Provider store={store}>
      <ModalWindowButton buttonComponent={() => null} />
    </Provider>
  );
});

test("Mount", () => {
  const { persistor, store } = createStore();

  mount(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ModalWindowButton buttonComponent={() => null} />
      </PersistGate>
    </Provider>
  );
});
