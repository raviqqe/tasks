import {
  type FirebaseApp,
  type FirebaseOptions,
  initializeApp,
} from "firebase/app";

type FirebaseConfiguration = Required<
  Pick<FirebaseOptions, "apiKey" | "authDomain" | "projectId">
>;

export class FirebaseInitializer {
  constructor(private readonly configuration: FirebaseConfiguration) {}

  public initialize(): FirebaseApp {
    return initializeApp(this.configuration);
  }
}
