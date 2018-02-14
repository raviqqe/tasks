import * as React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { createStore } from "../state";
import Tasks from "./tasks";

import "./style/app.css";

const { persistor, store } = createStore();

export default class extends React.Component {
    public render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Tasks />
                </PersistGate>
            </Provider>
        );
    }
}
