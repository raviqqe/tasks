import { FirebaseInitializer } from "../infrastructure/firebase/firebase-initializer.js";
import configuration from "../configuration.json" with { type: "json" };

export const firebaseInitializer = new FirebaseInitializer(
  configuration.firebase,
);
