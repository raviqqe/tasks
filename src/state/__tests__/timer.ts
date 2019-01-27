import { actionCreators, initialState, reducer } from "../timer";

import { createStore } from "..";
import * as audio from "../../drivers/audio";

test("Play an alarm", () => {
  const spy = jest.spyOn(audio, "playAlarm");

  const { store } = createStore();

  store.dispatch(actionCreators.playAlarm());

  expect(spy).toHaveBeenCalled();
});

test("Toggle a timer", () => {
  let state = initialState;

  expect(state).toEqual({ on: false });

  state = reducer(state, actionCreators.toggleTimer());
  expect(state).toEqual({ on: true });

  state = reducer(state, actionCreators.toggleTimer());
  expect(state).toEqual({ on: false });
});
