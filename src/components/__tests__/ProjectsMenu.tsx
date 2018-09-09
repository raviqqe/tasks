import { mount, shallow } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { createStore } from "../../state";
import { actionCreators } from "../../state/tasks";
import ProjectsMenu from "../ProjectsMenu";

test("Shallow mount", () => {
  const { store } = createStore();

  shallow(
    <Provider store={store}>
      <ProjectsMenu />
    </Provider>
  );
});

test("Mount", () => {
  const { persistor, store } = createStore();

  mount(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ProjectsMenu />
      </PersistGate>
    </Provider>
  );
});

test("List projects in case insensitive order", () => {
  const { store } = createStore();

  const wrapper = mount(
    <Provider store={store}>
      <ProjectsMenu />
    </Provider>
  );

  store.dispatch(actionCreators.addProject("X"));

  expect(wrapper.text()).toBe("XdefaultX");
});
