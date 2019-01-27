import { mount, shallow } from "enzyme";
import React from "react";
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

// TODO: Enable these tests when https://github.com/airbnb/enzyme/issues/1647 is fixed.
//
// test("Make task lists fixed when devices get touchable", () => {
//   const { store } = createStore();

//   const wrapper = shallow(
//     <Provider store={store}>
//       <Home />
//     </Provider>
//   )
//     .dive({ context: { store } })
//     .dive();

//   expect(wrapper.state("listsFixed")).toBeFalsy();
//   wrapper.setProps({ touchable: true });
//   expect(wrapper.state("listsFixed")).toBeTruthy();
// });

// test("Render with an invalid current project name", () => {
//   const { store } = createStore();

//   const element = shallow(
//     <Provider store={store}>
//       <Home />
//     </Provider>
//   )
//     .dive({ context: { store } })
//     .dive();

//   element.setProps({ currentProjectName: undefined });
// });
