import { mapValues } from "lodash";
import { applyMiddleware, combineReducers, createStore as createReduxStore, Reducer, Store } from "redux";
import { Persistor, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import * as tasks from "./tasks";
import * as timer from "./timer";

const ducks: { [name: string]: { persistent: boolean, reducer: Reducer<any> } }
    = { tasks, timer };

export function createStore(): { persistor: Persistor, store: Store<any> } {
    const store = createReduxStore(
        persistReducer(
            {
                key: "root",
                storage,
                whitelist: Object.keys(ducks).filter((name) => ducks[name].persistent),
            },
            combineReducers(mapValues(ducks, ({ reducer }) => reducer))),
        applyMiddleware(thunk));

    return { persistor: persistStore(store), store };
}
