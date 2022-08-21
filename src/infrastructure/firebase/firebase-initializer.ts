import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";
import {
  enableMultiTabIndexedDbPersistence,
  getFirestore,
} from "firebase/firestore";

interface IFirebaseConfiguration
  extends Required<
    Pick<FirebaseOptions, "apiKey" | "authDomain" | "projectId">
  > {}

export class FirebaseInitializer {
  constructor(private readonly configuration: IFirebaseConfiguration) {}

  public async initialize(): Promise<FirebaseApp> {
    const app = initializeApp(this.configuration);

    await enableMultiTabIndexedDbPersistence(getFirestore(app));

    return app;
  }
}
