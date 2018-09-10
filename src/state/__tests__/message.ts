import { createStore } from "..";
import { sleep } from "../../infra/utils";
import { actionCreators, initialState } from "../message";

jest.setTimeout(10000);

test("Send a message", async () => {
  const { store } = createStore();

  expect(store.getState().message).toEqual(initialState);

  store.dispatch(actionCreators.sendMessage("foo"));

  await sleep(100);
  expect(store.getState().message).toEqual({ message: "foo" });

  await sleep(5000);
  expect(store.getState().message).toEqual({ message: "" });
});

test("Clear a message", () => {
  const { store } = createStore();

  expect(store.getState().message).toEqual(initialState);

  store.dispatch(actionCreators.sendMessage("foo"));
  expect(store.getState().message).toEqual({ message: "foo" });

  store.dispatch(actionCreators.clearMessage());
  expect(store.getState().message).toEqual({ message: "" });
});
