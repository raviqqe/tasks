import { mount, shallow } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { ITask } from "../../domain/task";
import { createStore } from "../../state";
import Task from "../Task";

const exampleTask: ITask = {
  createdAt: new Date().getTime(),
  description: "bar",
  id: "id",
  name: "foo",
  spentSeconds: 0,
  updatedAt: new Date().getTime()
};

for (const done of [false, true]) {
  describe(`{done? "Done" : "Todo"} tasks`, () => {
    test("Shallow mount", () => {
      const { store } = createStore();

      shallow(
        <Provider store={store}>
          <Task done={done} {...exampleTask} />
        </Provider>
      );
    });

    test("Mount", () => {
      const { persistor, store } = createStore();

      mount(
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Task done={done} {...exampleTask} />
          </PersistGate>
        </Provider>
      );
    });
  });
}
