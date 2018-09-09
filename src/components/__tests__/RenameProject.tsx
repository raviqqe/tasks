import { mount, shallow } from "enzyme";
import { size } from "lodash";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { createStore } from "../../state";
import { createRootElement } from "../../utils";
import RenameProject from "../RenameProject";

test("Shallow mount", () => {
  const { store } = createStore();

  shallow(
    <Provider store={store}>
      <RenameProject />
    </Provider>
  );
});

test("Mount", () => {
  const { persistor, store } = createStore();

  mount(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RenameProject />
      </PersistGate>
    </Provider>
  );
});

test("Rename a project", () => {
  const { store } = createStore();

  const wrapper = mount(
    <Provider store={store}>
      <RenameProject />
    </Provider>,
    { attachTo: createRootElement() }
  );

  expect(size(store.getState().tasks.projects)).toBe(1);
  expect(store.getState().tasks.projects.default).toBeDefined();

  wrapper.find("button").simulate("click");
  wrapper.find("input").simulate("change", { target: { value: "foo" } });
  wrapper.find("form").simulate("submit");

  expect(size(store.getState().tasks.projects)).toBe(1);
  expect(store.getState().tasks.projects.foo).toBeDefined();
});

test("Normalize project names", () => {
  const { store } = createStore();

  const wrapper = mount(
    <Provider store={store}>
      <RenameProject />
    </Provider>,
    { attachTo: createRootElement() }
  );

  expect(size(store.getState().tasks.projects)).toBe(1);
  expect(store.getState().tasks.projects.default).toBeDefined();

  wrapper.find("button").simulate("click");
  wrapper.find("input").simulate("change", { target: { value: " foo\n " } });
  wrapper.find("form").simulate("submit");

  expect(size(store.getState().tasks.projects)).toBe(1);
  expect(store.getState().tasks.projects.foo).toBeDefined();
});
