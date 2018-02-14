import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

import * as audio from "../infra/audio";

const actionCreator = actionCreatorFactory("TIMER");

export const actionCreators = {
    playAlarm: () => (_, getState) => audio.playAlarm(getState().settings.alarmVolume),
    toggleTimer: actionCreator("TOGGLE_TIMER"),
};

export const initialState = { on: false };

export const reducer = reducerWithInitialState(initialState)
    .case(actionCreators.toggleTimer, (state) => ({ on: !state.on }));

export const persistent = false;
