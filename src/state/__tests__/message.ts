import { createStore } from "..";
import { sleep } from "../../infra/utils";
import { actionCreators, initialState, reducer } from "../message";

function getState(store): typeof initialState {
    return store.getState().message;
}

test("Send a message", async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

    const { store } = createStore();

    expect(getState(store)).toEqual(initialState);

    store.dispatch(actionCreators.sendMessage("foo"));

    await sleep(100);
    expect(getState(store)).toEqual({ error: false, message: "foo" });

    await sleep(5000);
    expect(getState(store)).toEqual({ error: false, message: "" });
});

test("Clear a message", async () => {
    const { store } = createStore();

    expect(getState(store)).toEqual(initialState);

    store.dispatch(actionCreators.sendMessage("foo", { temporary: false }));
    expect(getState(store)).toEqual({ error: false, message: "foo" });

    store.dispatch(actionCreators.clearMessage());
    expect(getState(store)).toEqual({ error: false, message: "" });
});
