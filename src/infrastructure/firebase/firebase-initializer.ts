import {
  type FirebaseApp,
  type FirebaseOptions,
  initializeApp,
} from "firebase/app";

type FirebaseConfiguration = Required<
  Pick<FirebaseOptions, "apiKey" | "authDomain" | "projectId">
>;

export class FirebaseInitializer {
  private readonly configuration: FirebaseConfiguration;

  public constructor(configuration: FirebaseConfiguration) {
    this.configuration = configuration;
  }

  public initialize(): FirebaseApp {
    return initializeApp(this.configuration);
  }
}
