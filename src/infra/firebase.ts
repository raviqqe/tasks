import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import config from "../config";

const { apiKey, projectId } = config.firebase;

firebase.initializeApp({
  apiKey,
  authDomain: `${projectId}.firebaseapp.com`,
  projectId
});

if (window.localStorage) {
  firebase.firestore().enablePersistence();
}

export async function signIn(): Promise<void> {
  await firebase
    .auth()
    .signInWithRedirect(new firebase.auth.GoogleAuthProvider());
}

export async function signOut(): Promise<void> {
  await firebase.auth().signOut();
}

export function onAuthStateChanged(
  callback: (user: firebase.User) => void
): void {
  firebase.auth().onAuthStateChanged(callback);
}
