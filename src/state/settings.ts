import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

import * as notification from "../infra/notification";

const actionCreator = actionCreatorFactory("SETTINGS");

const requestNotificationPermission = actionCreator("REQUEST_NOTIFICATION_PERMISSION");
const setAlarmVolume = actionCreator<number>("SET_ALARM_VOLUME");
const setNotificationState = actionCreator<boolean | null>("SET_NOTIFICATION_STATE");

export const actionCreators = {
    requestNotificationPermission: () => async (dispatch) => {
        dispatch(setNotificationState(await notification.requestPermission()));
    },
    setAlarmVolume,
    setNotificationState,
};

export type IActionCreators = typeof actionCreators;

export const initialState = {
    alarmVolume: 0.5, // 0 to 1
    notificationOn: notification.permission(),
};

export type IState = typeof initialState;

export const reducer = reducerWithInitialState(initialState)
    .case(setAlarmVolume, (state, alarmVolume) => ({ ...state, alarmVolume }))
    .case(setNotificationState, (state, notificationOn) => ({ ...state, notificationOn }));

export const persistent = true;
