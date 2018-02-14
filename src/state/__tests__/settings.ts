import { createStore } from "..";
import { sleep } from "../../infra/utils";
import { actionCreators, initialState, reducer } from "../settings";

jest.mock("../../infra/notification", () => ({
    permission: () => true,
    requestPermission: () => true,
}));

function getState(store): typeof initialState {
    return store.getState().settings;
}

test("Check notification permission", () => {
    const { store } = createStore();

    expect(getState(store)).toEqual(initialState);

    store.dispatch(actionCreators.checkNotificationPermission());
    expect(getState(store)).toEqual({ ...initialState, notificationOn: true });
});

test("Request notification permission", async () => {
    const { store } = createStore();

    expect(getState(store)).toEqual(initialState);

    store.dispatch(actionCreators.requestNotificationPermission());
    await sleep(1);
    expect(getState(store)).toEqual({ ...initialState, notificationOn: true });
});

test("Set alarm volume", () => {
    expect(initialState.alarmVolume).toBe(0.5);
    const state = reducer(initialState, actionCreators.setAlarmVolume(1));
    expect(state.alarmVolume).toBe(1);
});

test("Set notification state", () => {
    expect(initialState.notificationOn).toBe(null);
    const state = reducer(initialState, actionCreators.setNotificationState(true));
    expect(state.notificationOn).toBe(true);
});
