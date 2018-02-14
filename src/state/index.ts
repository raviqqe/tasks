import { mapValues } from "lodash";
import { applyMiddleware, combineReducers, createStore, Reducer } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import * as tasks from "./tasks";
import * as timer from "./timer";

const ducks: { [name: string]: { persistent: boolean, reducer: Reducer<any> } }
    = { tasks, timer };

export const store = createStore(
    persistReducer(
        {
            key: "root",
            storage,
            whitelist: Object.keys(ducks).filter((name) => ducks[name].persistent),
        },
        combineReducers(mapValues(ducks, ({ reducer }) => reducer))),
    applyMiddleware(thunk));

export const persistor = persistStore(store);
