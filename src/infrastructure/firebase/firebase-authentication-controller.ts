import { delay } from "es-toolkit";
import type { FirebaseApp } from "firebase/app";
import {
  type Auth,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import type { AuthenticationController } from "../../application/authentication-controller.js";

export class FirebaseAuthenticationController
  implements AuthenticationController
{
  readonly #auth: Auth;
  #signedIn: boolean | null = null;

  constructor(app: FirebaseApp) {
    this.#auth = getAuth(app);
    this.#auth.onAuthStateChanged((user) => {
      this.#signedIn = !!user;
    });
  }

  async signIn(): Promise<void> {
    await signInWithPopup(this.#auth, new GoogleAuthProvider());
  }

  async signOut(): Promise<void> {
    await this.#auth.signOut();
  }

  async isSignedIn(): Promise<boolean> {
    while (this.#signedIn === null) {
      await delay(10);
    }

    return this.#signedIn;
  }
}
