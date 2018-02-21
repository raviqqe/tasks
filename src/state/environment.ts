import { Store } from "redux";
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

import {
    isSmallWindow, onPointerChange, onTouchabilityChange, onWindowSizeChange,
    pointerAvailable, touchable,
} from "../infra/media";

const actionCreator = actionCreatorFactory("ENVIRONMENT");

const setIsSmallWindow = actionCreator<boolean>("SET_IS_SMALL_WINDOW");
const setPointerAvailable = actionCreator<boolean>("SET_POINTER_AVAILABLE");
const setTouchable = actionCreator<boolean>("SET_TOUCHABLE");

export const initialState = {
    isSmallWindow,
    pointerAvailable,
    touchable,
};

export type IState = typeof initialState;

export const reducer = reducerWithInitialState(initialState)
    .case(setIsSmallWindow, (state, isSmallWindow) => ({ ...state, isSmallWindow }))
    .case(setPointerAvailable, (state, pointerAvailable) => ({ ...state, pointerAvailable }))
    .case(setTouchable, (state, touchable) => ({ ...state, touchable }));

export function initializeStore(store: Store<any>): void {
    onWindowSizeChange((isSmallWindow) => store.dispatch(setIsSmallWindow(isSmallWindow)));
    onTouchabilityChange((touchable: boolean) => store.dispatch(setTouchable(touchable)));
    onPointerChange((pointerAvailable: boolean) =>
        store.dispatch(setPointerAvailable(pointerAvailable)));
}

export const persistent = false;
