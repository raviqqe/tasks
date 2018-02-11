import { applyMiddleware, combineReducers, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

export const store = createStore(
    persistReducer({ key: "root", storage }, combineReducers({})),
    applyMiddleware(thunk));

export const persistor = persistStore(store);
