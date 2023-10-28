import {
  type FirebaseApp,
  type FirebaseOptions,
  initializeApp,
} from "firebase/app";
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";

interface IFirebaseConfiguration
  extends Required<
    Pick<FirebaseOptions, "apiKey" | "authDomain" | "projectId">
  > {}

export class FirebaseInitializer {
  constructor(private readonly configuration: IFirebaseConfiguration) {}

  public async initialize(): Promise<FirebaseApp> {
    const app = initializeApp(this.configuration);

    initializeFirestore(app, {
      localCache: persistentLocalCache({
        tabManager: persistentMultipleTabManager(),
      }),
    });

    return app;
  }
}
