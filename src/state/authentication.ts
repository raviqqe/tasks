import { Store } from "redux";
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

import * as firebase from "../infra/firebase";
import * as message from "./message";

const actionCreator = actionCreatorFactory("AUTHENTICATION");

export const actionCreators = {
    deleteAccount: () => firebase.deleteAccount,
    setSignInState: actionCreator<boolean>("SET_SIGN_IN_STATE"),
    signIn: () => async (dispatch) => {
        try {
            await firebase.signIn();
        } catch (error) {
            dispatch(message.actionCreators.sendMessage("Failed to sign in.", { error: true }));
        }
    },
    signOut: () => firebase.signOut,
};

export const initialState = { signedIn: false };

export const reducer = reducerWithInitialState(initialState)
    .case(actionCreators.setSignInState, (_, signedIn) => ({ signedIn }));

export function initializeStore(store: Store<any>): void {
    firebase.onAuthStateChanged((user) => store.dispatch(actionCreators.setSignInState(!!user)));
}

export const persistent = false;
