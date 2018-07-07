import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { createTask } from "../../domain/task";
import { createStore } from "../../state";
import { actionCreators } from "../../state/tasks";
import Timer from "../Timer";

test("Render", () => {
  const { persistor, store } = createStore();

  const fooTask = createTask("foo", "");

  store.dispatch(actionCreators.addTask(fooTask));

  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Timer currentTask={fooTask} />
      </PersistGate>
    </Provider>,
    document.createElement("div")
  );
});
