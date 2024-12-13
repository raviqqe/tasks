import { delay } from "es-toolkit";
import { type FirebaseApp } from "firebase/app";
import {
  type Auth,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { type AuthenticationController } from "../../application/authentication-controller.js";

export class FirebaseAuthenticationController
  implements AuthenticationController
{
  private readonly auth: Auth;
  private signedIn: boolean | null = null;

  constructor(app: FirebaseApp) {
    this.auth = getAuth(app);
    this.auth.onAuthStateChanged((user) => {
      this.signedIn = !!user;
    });
  }

  public async signIn(): Promise<void> {
    await signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  public async signOut(): Promise<void> {
    await this.auth.signOut();
  }

  public async isSignedIn(): Promise<boolean> {
    while (this.signedIn === null) {
      await delay(10);
    }

    return this.signedIn;
  }
}
