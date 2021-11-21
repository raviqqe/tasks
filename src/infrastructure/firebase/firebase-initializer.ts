import { FirebaseApp, initializeApp } from "firebase/app";
import {
  enableMultiTabIndexedDbPersistence,
  getFirestore,
} from "firebase/firestore";

export class FirebaseInitializer {
  constructor(
    private readonly projectId: string,
    private readonly apiKey: string
  ) {}

  public async initialize(): Promise<FirebaseApp> {
    const app = initializeApp({
      apiKey: this.apiKey,
      authDomain: `${this.projectId}.firebaseapp.com`,
      projectId: this.projectId,
      storageBucket: `${this.projectId}.appspot.com`,
    });

    await enableMultiTabIndexedDbPersistence(getFirestore(app));

    return app;
  }
}
