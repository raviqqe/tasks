import * as firebase from "firebase";

import config from "../config";

const { apiKey, projectId } = config.firebase;

firebase.initializeApp({
    apiKey,
    authDomain: `${projectId}.firebaseapp.com`,
    projectId,
});

export async function signIn(): Promise<void> {
    await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
}

export async function signOut(): Promise<void> {
    await firebase.auth().signOut();
}

export function onAuthStateChanged(callback: (user: firebase.User) => void): void {
    firebase.auth().onAuthStateChanged(callback);
}
