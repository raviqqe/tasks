import { type FirebaseApp } from "firebase/app";
import {
  type Auth,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { type IAuthenticationController } from "../../application/authentication-controller.js";
import { sleep } from "../../domain/utilities.js";

export class FirebaseAuthenticationController
  implements IAuthenticationController
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
      await sleep(10);
    }

    return this.signedIn;
  }
}
