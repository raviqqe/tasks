import { mount, shallow } from "enzyme";
import * as React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { createTask } from "../../domain/task";
import { createStore } from "../../state";
import { actionCreators } from "../../state/tasks";
import Timer from "../Timer";

const fooTask = createTask("foo", "");

test("Shallow mount", () => {
  const { store } = createStore();

  shallow(
    <Provider store={store}>
      <Timer currentTask={fooTask} />
    </Provider>
  );
});

test("Mount", () => {
  const { persistor, store } = createStore();

  store.dispatch(actionCreators.addTask(fooTask));

  mount(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Timer currentTask={fooTask} />
      </PersistGate>
    </Provider>
  );
});
