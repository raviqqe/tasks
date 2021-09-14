import "firebase/compat/auth";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";

export class FirebaseInitializer {
  constructor(projectId: string, apiKey: string) {
    firebase.initializeApp({
      apiKey,
      authDomain: `${projectId}.firebaseapp.com`,
      projectId,
      storageBucket: `${projectId}.appspot.com`,
    });
  }

  public async initialize(): Promise<void> {
    await firebase.firestore().enablePersistence({ synchronizeTabs: true });
  }
}
