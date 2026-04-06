import {
  type FirebaseApp,
  type FirebaseOptions,
  initializeApp,
} from "firebase/app";

type FirebaseConfiguration = Required<
  Pick<FirebaseOptions, "apiKey" | "authDomain" | "projectId">
>;

export class FirebaseInitializer {
  readonly #configuration: FirebaseConfiguration;

  constructor(configuration: FirebaseConfiguration) {
    this.#configuration = configuration;
  }

  initialize(): FirebaseApp {
    return initializeApp(this.#configuration);
  }
}
