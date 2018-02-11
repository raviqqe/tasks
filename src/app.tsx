import * as React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { persistor, store } from "./state";

import "./app.css";

const logo = require("./logo.svg");

export default class extends React.Component {
    public render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <div className="App">
                        <header className="App-header">
                            <img src={logo} className="App-logo" alt="logo" />
                            <h1 className="App-title">Welcome to React</h1>
                        </header>
                    </div>
                </PersistGate>
            </Provider>
        );
    }
}
