import * as React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { persistor, store } from "../state";
import Tasks from "./tasks";

import "./style/app.css";

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
