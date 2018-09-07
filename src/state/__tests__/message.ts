import { createStore } from "..";
import { sleep } from "../../infra/utils";
import { actionCreators, initialState } from "../message";

jest.setTimeout(10000);

function getState(store): typeof initialState {
  return store.getState().message;
}

test("Send a message", async () => {
  const { store } = createStore();

  expect(getState(store)).toEqual(initialState);

  store.dispatch(actionCreators.sendMessage("foo"));

  await sleep(100);
  expect(getState(store)).toEqual({ message: "foo" });

  await sleep(5000);
  expect(getState(store)).toEqual({ message: "" });
});

test("Clear a message", () => {
  const { store } = createStore();

  expect(getState(store)).toEqual(initialState);

  store.dispatch(actionCreators.sendMessage("foo"));
  expect(getState(store)).toEqual({ message: "foo" });

  store.dispatch(actionCreators.clearMessage());
  expect(getState(store)).toEqual({ message: "" });
});
