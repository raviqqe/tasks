import { FirebaseAuthenticationController } from "../infrastructure/firebase/firebase-authentication-controller.js";
import { firebaseApp } from "./firebase-app.js";

export const authenticationController = new FirebaseAuthenticationController(
  firebaseApp,
);
