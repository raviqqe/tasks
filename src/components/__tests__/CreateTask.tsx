import { mount, shallow } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { createStore } from "../../state";
import { createRootElement } from "../../utils";
import CreateTask from "../CreateTask";

test("Shallow mount", () => {
  const { store } = createStore();

  shallow(
    <Provider store={store}>
      <CreateTask />
    </Provider>
  );
});

test("Mount", () => {
  const { persistor, store } = createStore();

  mount(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CreateTask />
      </PersistGate>
    </Provider>
  );
});

test("Create tasks", () => {
  const { store } = createStore();

  const wrapper = mount(
    <Provider store={store}>
      <CreateTask />
    </Provider>,
    { attachTo: createRootElement() }
  );

  wrapper.simulate("click");
  wrapper.find("input").simulate("change", { target: { value: "foo" } });
  wrapper
    .find("form")
    .find("button")
    .simulate("submit");

  expect(store.getState().tasks.projects.default.todoTasks[0].name).toBe("foo");
});

test("Create tasks when shift-enter keys are typed", () => {
  const { store } = createStore();

  const wrapper = mount(
    <Provider store={store}>
      <CreateTask />
    </Provider>,
    { attachTo: createRootElement() }
  );

  wrapper.simulate("click");
  wrapper.find("input").simulate("change", { target: { value: "foo" } });
  wrapper.find("textarea").simulate("keydown", { keyCode: 13, shiftKey: true });

  expect(store.getState().tasks.projects.default.todoTasks[0].name).toBe("foo");
});
