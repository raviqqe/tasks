import { mapValues } from "lodash";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import * as tasks from "./tasks";

const ducks = { tasks };

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
