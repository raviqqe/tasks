import configuration from "../configuration.json" with { type: "json" };
import { FirebaseInitializer } from "../infrastructure/firebase/firebase-initializer.js";

export const firebaseInitializer = new FirebaseInitializer(
  configuration.firebase,
);
