import { Store } from "redux";
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

import {
  onPointerChange,
  onTouchabilityChange,
  onWindowSizeChange,
  pointerAvailable,
  touchable,
  windowSmall
} from "../drivers/media";

const actionCreator = actionCreatorFactory("ENVIRONMENT");

const setWindowSmall = actionCreator<boolean>("SET_WINDOW_SMALL");
const setPointerAvailable = actionCreator<boolean>("SET_POINTER_AVAILABLE");
const setTouchable = actionCreator<boolean>("SET_TOUCHABLE");

export const initialState = {
  pointerAvailable,
  touchable,
  windowSmall
};

export type IState = typeof initialState;

export const reducer = reducerWithInitialState(initialState)
  .case(setWindowSmall, (state, windowSmall) => ({
    ...state,
    windowSmall
  }))
  .case(setPointerAvailable, (state, pointerAvailable) => ({
    ...state,
    pointerAvailable
  }))
  .case(setTouchable, (state, touchable) => ({ ...state, touchable }));

export function initializeStore(store: Store): void {
  onWindowSizeChange(windowSmall =>
    store.dispatch(setWindowSmall(windowSmall))
  );
  onTouchabilityChange((touchable: boolean) =>
    store.dispatch(setTouchable(touchable))
  );
  onPointerChange((pointerAvailable: boolean) =>
    store.dispatch(setPointerAvailable(pointerAvailable))
  );
}

export const persistent = false;
