import { mount, shallow } from "enzyme";
import * as React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { createStore } from "../../state";
import Home from "../Home";

test("Shallow mount", () => {
  const { store } = createStore();

  shallow(
    <Provider store={store}>
      <Home />
    </Provider>
  );
});

test("Render", () => {
  const { persistor, store } = createStore();

  mount(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Home />
      </PersistGate>
    </Provider>
  );
});

test("Make task lists fixed when devices get touchable", () => {
  const { store } = createStore();

  const element = shallow(
    <Provider store={store}>
      <Home />
    </Provider>
  )
    .dive({ context: { store } })
    .dive();

  expect(element.state("listsFixed")).toBeFalsy();
  element.setProps({ touchable: true });
  expect(element.state("listsFixed")).toBeTruthy();
});
