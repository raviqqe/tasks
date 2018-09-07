import { actionCreators, initialState, reducer } from "../settings";

test("Set alarm volume", () => {
  expect(initialState.alarmVolume).toBe(0.5);
  const state = reducer(initialState, actionCreators.setAlarmVolume(1));
  expect(state.alarmVolume).toBe(1);
});

test("Set notification state", () => {
  const state = reducer(
    initialState,
    actionCreators.setNotificationState(true)
  );
  expect(state.notificationOn).toBe(true);
});
