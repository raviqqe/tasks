import { actionCreators, initialState, reducer } from "../timer";

import * as audio from "../../infra/audio";

test("Play an alarm", () => {
  const spy = jest.spyOn(audio, "playAlarm");

  actionCreators.playAlarm()({}, () => ({ settings: { alarmVolume: 0.5 } }));

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
