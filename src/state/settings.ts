import { Store } from "redux";
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

import * as notification from "../drivers/notification";

const actionCreator = actionCreatorFactory("SETTINGS");

const setAlarmVolume = actionCreator<number>("SET_ALARM_VOLUME");
const setNotificationState = actionCreator<boolean | null>(
  "SET_NOTIFICATION_STATE"
);

export const actionCreators = {
  setAlarmVolume,
  setNotificationState
};

export type IActionCreators = typeof actionCreators;

export const initialState = {
  alarmVolume: 0.5, // 0 to 1
  notificationOn: notification.permission()
};

export type IState = typeof initialState;

export const reducer = reducerWithInitialState(initialState)
  .case(setAlarmVolume, (state, alarmVolume) => ({ ...state, alarmVolume }))
  .case(setNotificationState, (state, notificationOn) => ({
    ...state,
    notificationOn
  }));

export async function initializeStore(store: Store): Promise<void> {
  const setPermission = permission =>
    store.dispatch(setNotificationState(permission));

  if (notification.permission() === null) {
    setPermission(await notification.requestPermission());
  }

  setPermission(notification.permission());
  notification.onPermissionChange(setPermission);
}

export const persistent = true;
