import { Action, applyMiddleware, combineReducers, Reducer } from "redux";
import * as redux from "redux";
import { Persistor, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk, * as reduxThunk from "redux-thunk";
import * as authentication from "./authentication";
import * as environment from "./environment";
import * as message from "./message";
import * as settings from "./settings";
import * as tasks from "./tasks";

interface IDuck {
  initializeStore?: (store: Store) => void;
  persistent: boolean;
  reducer: Reducer;
}

const ducks: {
  authentication: IDuck;
  environment: IDuck;
  message: IDuck;
  settings: IDuck;
  tasks: IDuck;
} = {
  authentication,
  environment,
  message,
  settings,
  tasks
};

export interface IGlobalState {
  authentication: authentication.IState;
  environment: environment.IState;
  message: message.IState;
  settings: settings.IState;
  tasks: tasks.IState;
}

export type Store = redux.Store<IGlobalState, any>;

export type ThunkAction = reduxThunk.ThunkAction<
  any,
  IGlobalState,
  void,
  Action
>;

export function createStore(): {
  persistor: Persistor;
  store: Store;
} {
  const store = redux.createStore(
    persistReducer(
      {
        key: "root",
        storage,
        whitelist: Object.keys(ducks).filter(name => ducks[name].persistent)
      },
      combineReducers({
        authentication: authentication.reducer,
        environment: environment.reducer,
        message: message.reducer,
        settings: settings.reducer,
        tasks: tasks.reducer
      })
    ),
    applyMiddleware(thunk)
  );

  for (const name of Object.keys(ducks)) {
    const { initializeStore } = ducks[name];

    if (initializeStore) {
      initializeStore(store);
    }
  }

  return { persistor: persistStore(store), store };
}
