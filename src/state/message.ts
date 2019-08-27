import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { ThunkAction } from ".";
import { sleep } from "../drivers/utils";

const actionCreator = actionCreatorFactory("MESSAGE");

const clearMessage = actionCreator("CLEAR_MESSAGE");
const sendMessage = actionCreator<string>("SEND_MESSAGE");

export const actionCreators = {
  clearMessage,
  sendMessage: (message: string): ThunkAction => async (
    dispatch
  ): Promise<void> => {
    dispatch(sendMessage(message));
    await sleep(5000);
    dispatch(clearMessage());
  }
};

export type IActionCreators = typeof actionCreators;

export const initialState = { message: "" };

export type IState = typeof initialState;

export const reducer = reducerWithInitialState(initialState)
  .case(actionCreators.clearMessage, () => ({ message: "" }))
  .case(sendMessage, (_, message) => ({ message }));

export const persistent = false;
