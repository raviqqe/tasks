import { defaultTo } from "lodash";
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

import { sleep } from "../infra/utils";

const actionCreator = actionCreatorFactory("MESSAGE");

const clearMessage = actionCreator("CLEAR_MESSAGE");
const sendMessage = actionCreator<{ error: boolean, message: string }>("SEND_MESSAGE");

export const actionCreators = {
    clearMessage,
    sendMessage: (message: string, options: { error?: boolean, temporary?: boolean } = {}) => async (dispatch) => {
        dispatch(sendMessage({
            error: defaultTo(options.error, false),
            message,
        }));

        if (defaultTo(options.temporary, true)) {
            await sleep(5000);
            dispatch(clearMessage());
        }
    },
};

export const initialState = { error: false, message: "" };

export const reducer = reducerWithInitialState(initialState)
    .case(actionCreators.clearMessage, (state) => ({ error: false, message: "" }))
    .case(sendMessage, (_, state) => state);

export const persistent = false;
